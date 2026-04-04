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

	var ACCENT_CHIP = {
		primary: 'group-hover:border-primary-container',
		secondary: 'group-hover:border-secondary',
		tertiary: 'group-hover:border-tertiary'
	};

	var LINK_BTN_THEME = {
		primary: 'hover:bg-primary-container hover:text-on-primary-container',
		secondary: 'hover:bg-secondary hover:text-on-secondary-container',
		tertiary: 'hover:bg-tertiary hover:text-on-tertiary-container'
	};

	function escapeAttr(s) {
		return String(s)
			.replace(/&/g, '&amp;')
			.replace(/"/g, '&quot;')
			.replace(/</g, '&lt;');
	}

	function formatPlainLine(raw) {
		if (raw == null || raw === '') return '';
		return normalizeForWeb(decodeResumeText(raw));
	}

	var MONTH_ABBREVS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

	function formatPeriod(period) {
		if (period == null || period === '') return '';
		var s = formatPlainLine(period);
		var parts = s.split(/\s*(?:--|—|–)\s*/);
		if (parts.length < 2) return s;

		function fmtSeg(seg) {
			seg = String(seg).trim();
			var m = seg.match(/^(\d{1,2})\/(\d{4})$/);
			if (!m) return seg;
			var mi = parseInt(m[1], 10) - 1;
			if (mi < 0 || mi > 11) return seg;
			return MONTH_ABBREVS[mi] + ' ' + m[2];
		}

		return fmtSeg(parts[0]) + ' — ' + fmtSeg(parts[1]);
	}

	function formatCompanyHeadline(company) {
		if (company == null || company === '') return '';
		return String(company).trim().toUpperCase().replace(/\s+/g, '_');
	}

	var JOB_ACCENTS = {
		microsoft: 'primary',
		dentsu: 'secondary',
		micro_data_strategy: 'tertiary',
		teahouse: 'primary'
	};

	var JOB_ACCENT_STYLES = {
		primary: {
			line: 'bg-outline-variant/30 group-hover:bg-primary-container',
			dot: 'bg-primary-container shadow-[0_0_8px_rgba(0,240,255,0.8)]',
			roleClass: 'text-primary-container'
		},
		secondary: {
			line: 'bg-outline-variant/30 group-hover:bg-secondary',
			dot: 'bg-secondary shadow-[0_0_8px_rgba(254,0,254,0.8)]',
			roleClass: 'text-secondary'
		},
		tertiary: {
			line: 'bg-outline-variant/30 group-hover:bg-tertiary',
			dot: 'bg-tertiary shadow-[0_0_8px_rgba(187,234,0,0.8)]',
			roleClass: 'text-tertiary'
		}
	};

	function renderWorkBulletsInner(bullets) {
		if (!bullets || !bullets.length) return '';
		return bullets.map(function (b) {
			var titleHtml = formatBulletSegment(b.title);
			var bodyHtml = formatBulletSegment(b.text);
			return (
				'<li>' +
				'<span class="font-mono text-[10px] text-white uppercase tracking-wider block mb-0.5">' +
				titleHtml +
				'</span>' +
				'<span class="text-on-surface-variant font-body leading-relaxed">' +
				bodyHtml +
				'</span>' +
				'</li>'
			);
		}).join('');
	}

	function renderWorkJobHtml(job) {
		var accent = JOB_ACCENTS[job.id] || 'primary';
		var st = JOB_ACCENT_STYLES[accent] || JOB_ACCENT_STYLES.primary;
		var head = escapeHtml(formatCompanyHeadline(job.company));
		var period = escapeHtml(formatPeriod(job.period));
		var role = escapeHtml(formatPlainLine(job.role));
		var bullets = renderWorkBulletsInner(job.bullets);
		return (
			'<div class="experience-item relative pl-12 group" data-resume-id="' + escapeAttr(job.id) + '">' +
			'<div class="absolute left-0 top-0 h-full w-px ' + st.line + ' transition-colors"></div>' +
			'<div class="absolute left-[-4px] top-2 w-2 h-2 ' + st.dot + '"></div>' +
			'<button type="button" class="exp-toggle w-full text-left cursor-pointer" aria-expanded="false">' +
			'<div class="mb-1 flex flex-wrap items-center justify-between gap-4">' +
			'<h3 class="font-headline text-2xl font-bold text-on-surface">' + head + '</h3>' +
			'<div class="flex items-center gap-3">' +
			'<span class="font-mono text-[10px] text-neutral-500">' + period + '</span>' +
			'<span class="exp-chevron font-mono text-[10px] text-white transition-transform duration-200">&gt;</span>' +
			'</div></div>' +
			'<p class="font-mono text-[10px] ' + st.roleClass + ' tracking-widest uppercase">' + role + '</p>' +
			'</button>' +
			'<ul class="exp-bullets hidden mt-3 space-y-3 text-sm">' + bullets + '</ul>' +
			'</div>'
		);
	}

	function renderWorkExperienceList(container, jobs) {
		if (!jobs || !jobs.length) {
			container.innerHTML = '';
			container.setAttribute('aria-busy', 'false');
			return;
		}
		container.innerHTML = jobs.map(renderWorkJobHtml).join('');
		container.setAttribute('aria-busy', 'false');
	}

	function renderTechStackHtml(techStack, accent) {
		if (!techStack || !techStack.length) return '';
		var border = ACCENT_CHIP[accent] || ACCENT_CHIP.primary;
		return techStack.map(function (item) {
			var label = typeof item === 'string' ? item : String(item);
			var plain = formatPlainLine(label);
			return (
				'<span class="px-2 py-0.5 bg-surface-container-high border-l border-white ' + border +
				' transition-colors text-[10px] font-mono text-on-surface">' +
				escapeHtml(plain) +
				'</span>'
			);
		}).join('');
	}

	var SKILL_CARD_STYLES = {
		primary: {
			hoverBorder: 'hover:border-primary-container',
			line: 'bg-primary-container',
			label: 'text-primary-container'
		},
		secondary: {
			hoverBorder: 'hover:border-secondary',
			line: 'bg-secondary',
			label: 'text-secondary'
		},
		tertiary: {
			hoverBorder: 'hover:border-tertiary',
			line: 'bg-tertiary',
			label: 'text-tertiary'
		}
	};

	var SKILL_ACCENTS_CYCLE = ['tertiary', 'secondary', 'primary'];

	function renderSkillCategoryCard(cat, accent) {
		var st = SKILL_CARD_STYLES[accent] || SKILL_CARD_STYLES.primary;
		var title = escapeHtml(formatPlainLine(cat.category));
		var chips = renderTechStackHtml(cat.tech_stack || [], accent);
		return (
			'<div class="group bg-surface border border-outline-variant/20 p-1 flex flex-col ' +
			st.hoverBorder + ' transition-colors duration-300">' +
			'<div class="p-4 flex flex-col flex-1">' +
			'<div class="flex items-center gap-2 mb-4">' +
			'<span class="block w-4 h-px ' + st.line + '"></span>' +
			'<span class="font-mono text-[10px] ' + st.label + ' uppercase tracking-widest">' + title + '</span>' +
			'</div>' +
			'<div class="flex flex-wrap gap-1.5">' + chips + '</div>' +
			'</div></div>'
		);
	}

	function renderSkillsGrid(container, skills) {
		if (!container) return;
		if (!skills || !skills.length) {
			container.innerHTML = '';
			container.setAttribute('aria-busy', 'false');
			return;
		}
		container.innerHTML = skills.map(function (cat, i) {
			var accent = SKILL_ACCENTS_CYCLE[i % SKILL_ACCENTS_CYCLE.length];
			return renderSkillCategoryCard(cat, accent);
		}).join('');
		container.setAttribute('aria-busy', 'false');
	}

	function linkButtonHtml(href, label, accent, flex) {
		var theme = LINK_BTN_THEME[accent] || LINK_BTN_THEME.primary;
		var cls = 'py-2.5 border border-outline/20 ' + theme +
			' font-headline font-bold text-xs tracking-widest text-center transition-all uppercase';
		if (flex) cls = 'flex-1 ' + cls;
		else cls = 'block w-full ' + cls;
		return '<a href="' + escapeAttr(href) + '" target="_blank" rel="noopener noreferrer" class="' + cls + '">' +
			escapeHtml(label) + '</a>';
	}

	function renderProjectLinksHtml(proj, accent) {
		if (proj.github_frontend_url && proj.url) {
			return (
				'<div class="flex gap-2 w-full">' +
				linkButtonHtml(proj.url, 'Backend', accent, true) +
				linkButtonHtml(proj.github_frontend_url, 'Frontend', accent, true) +
				'</div>'
			);
		}
		if (proj.github_url && proj.url && proj.url !== proj.github_url) {
			var secondLabel = String(proj.url).indexOf('kaggle.com') >= 0 ? 'Kaggle' : 'Link';
			return (
				'<div class="flex gap-2 w-full">' +
				linkButtonHtml(proj.github_url, 'GitHub', accent, true) +
				linkButtonHtml(proj.url, secondLabel, accent, true) +
				'</div>'
			);
		}
		var href = proj.url || proj.github_url;
		if (!href) return '';
		var label = String(href).indexOf('github.com') >= 0 ? 'GitHub' : 'Link';
		return linkButtonHtml(href, label, accent, false);
	}

	function applyProjectCard(el, proj) {
		var accent = el.getAttribute('data-accent') || 'primary';
		var sub = el.querySelector('.project-subtitle');
		if (sub && proj.subtitle != null && proj.subtitle !== '') {
			sub.textContent = formatPlainLine(proj.subtitle);
		}
		var tech = el.querySelector('.project-tech-stack');
		if (tech) tech.innerHTML = renderTechStackHtml(proj.tech_stack, accent);
		var ul = el.querySelector('ul.exp-bullets');
		if (ul) renderBullets(ul, proj.bullets);
		var links = el.querySelector('.project-links');
		if (links) links.innerHTML = renderProjectLinksHtml(proj, accent);
	}

	function applyResumeData(data) {
		var workList = document.getElementById('work-experience-list');
		if (workList && data.work_experience) {
			renderWorkExperienceList(workList, data.work_experience);
		}

		var projects = indexById(data.projects);
		document.querySelectorAll('#projects [data-project-id]').forEach(function (el) {
			var proj = projects[el.getAttribute('data-project-id')];
			if (!proj) return;
			applyProjectCard(el, proj);
		});

		var skillsGrid = document.getElementById('skills-grid');
		if (skillsGrid) {
			renderSkillsGrid(skillsGrid, data.skills || []);
		}
	}

	if (typeof jsyaml === 'undefined' || typeof jsyaml.load !== 'function') {
		console.error('resume.js: js-yaml is required');
		return;
	}

	fetch('data/resume_data.yaml')
		.then(function (res) {
			if (!res.ok) throw new Error('Failed to load data/resume_data.yaml: ' + res.status);
			return res.text();
		})
		.then(function (text) {
			return jsyaml.load(text);
		})
		.then(applyResumeData)
		.catch(function (err) {
			console.error(err);
			var wl = document.getElementById('work-experience-list');
			if (wl) wl.setAttribute('aria-busy', 'false');
			var sg = document.getElementById('skills-grid');
			if (sg) sg.setAttribute('aria-busy', 'false');
		});
})();
