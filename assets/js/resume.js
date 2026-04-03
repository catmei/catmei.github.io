(function () {
	'use strict';

	function decodeResumeText(s) {
		if (s == null || s === '') return '';
		return String(s)
			.replace(/\\%/g, '%')
			.replace(/\\_/g, '_')
			.replace(/\\\$/g, '$')
			.replace(/\\&/g, '&')
			.replace(/\\'/g, "'")
			.replace(/\\to\b/g, '→')
			.replace(/\\times/g, '×')
			.replace(/\\gamma/g, 'γ')
			.replace(/\\sigma/g, 'σ');
	}

	/** Strip LaTeX-style $…$ wrappers and normalize punctuation after decode. */
	function normalizeForWeb(s) {
		var t = String(s);
		var i;
		for (i = 0; i < 6; i++) {
			var next = t.replace(/\$([^$]+)\$/g, '$1');
			if (next === t) break;
			t = next;
		}
		t = t.replace(/(\w)--(\w)/g, '$1–$2');
		return t;
	}

	function escapeHtml(s) {
		var div = document.createElement('div');
		div.textContent = s;
		return div.innerHTML;
	}

	/** Safe subset: **bold** and `code` → HTML (run on already-escaped text). */
	function inlineMarkdownToHtml(escaped) {
		return String(escaped)
			.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
			.replace(/`([^`]+)`/g, '<code>$1</code>');
	}

	function formatBulletSegment(raw) {
		var plain = normalizeForWeb(decodeResumeText(raw));
		return inlineMarkdownToHtml(escapeHtml(plain));
	}

	function renderBullets(ul, bullets) {
		if (!bullets || !bullets.length) return;
		var html = bullets.map(function (b) {
			var titleHtml = formatBulletSegment(b.title);
			var bodyHtml = formatBulletSegment(b.text);
			return (
				'<li class="resume-bullet">' +
				'<span class="resume-bullet__title">' +
				titleHtml +
				'</span>' +
				'<span class="resume-bullet__desc">' +
				bodyHtml +
				'</span>' +
				'</li>'
			);
		}).join('');
		ul.innerHTML = html;
	}

	function indexById(list) {
		var map = {};
		if (!list) return map;
		list.forEach(function (item) {
			if (item && item.id) map[item.id] = item;
		});
		return map;
	}

	function applyResumeData(data) {
		var jobs = indexById(data.work_experience);
		document.querySelectorAll('.experience-item[data-resume-id]').forEach(function (el) {
			var job = jobs[el.getAttribute('data-resume-id')];
			if (!job) return;
			var ul = el.querySelector('ul.exp-bullets');
			if (ul) renderBullets(ul, job.bullets);
		});

		var projects = indexById(data.projects);
		document.querySelectorAll('article[data-project-id]').forEach(function (el) {
			var proj = projects[el.getAttribute('data-project-id')];
			if (!proj) return;
			var ul = el.querySelector('ul.exp-bullets');
			if (ul) renderBullets(ul, proj.bullets);
		});
	}

	if (typeof jsyaml === 'undefined' || typeof jsyaml.load !== 'function') {
		console.error('resume.js: js-yaml is required');
		return;
	}

	fetch('resume_data.yaml')
		.then(function (res) {
			if (!res.ok) throw new Error('Failed to load resume_data.yaml: ' + res.status);
			return res.text();
		})
		.then(function (text) {
			return jsyaml.load(text);
		})
		.then(applyResumeData)
		.catch(function (err) {
			console.error(err);
		});
})();
