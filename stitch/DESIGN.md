# Design System Specification: The Terminal Architect

## 1. Overview & Creative North Star
**Creative North Star: "The Terminal Architect"**
This design system moves beyond the cliché "neon-on-black" aesthetic to create a high-end, editorial HUD (Heads-Up Display) experience. It treats the portfolio not as a website, but as a high-security mainframe interface. We are rejecting the "friendly" web of rounded corners and soft shadows in favor of aggressive precision, intentional asymmetry, and technical depth.

The system breaks the "template" look by utilizing a rigid underlying grid that is selectively shattered by overlapping code-blocks, "glitch" offsets, and semi-transparent glass panels that reveal the complexity beneath. Every pixel must feel like it was rendered by a machine for a professional who lives in the terminal.

## 2. Colors & Visual Texture
The palette is built on a foundation of extreme contrast. We use deep, "black-hole" neutrals punctuated by hyper-saturated neon data-points.

*   **Primary (Electric Cyan/Blue):** `primary` (#dbfcff) and `primary_container` (#00f0ff). Use these for primary data streams and essential navigation.
*   **Secondary (Hot Pink):** `secondary` (#ffabf3) and `secondary_container` (#fe00fe). Used for critical actions, status changes, and breaking the visual monotony.
*   **Tertiary (Acid Green):** `tertiary` (#e9ffa8) and `tertiary_container` (#bbea00). Reserved for "success" states, code-syntax highlighting, and technical metadata.
*   **The "No-Line" Rule:** We do not use 1px solid borders to define layout sections. Boundaries are created through:
    1.  **Background Shifts:** Transitioning from `surface` (#131313) to `surface_container_low` (#1c1b1b).
    2.  **Light As Boundary:** Using a subtle `outline_variant` (#3b494b) at 15% opacity to imply a container edge.
*   **Signature Textures:** Implement a global "Scanline" or "Grain" overlay at 2% opacity to provide a physical, screen-like feel. Use `primary_container` for ultra-thin (0.5pt) glowing separators that fade out using linear gradients.

## 3. Typography
Typography is the core of the digital interface. We pair a high-character geometric sans-serif with a functional, technical body face.

*   **Display & Headline (Space Grotesk):** This is our "Interface" font. It must feel mechanical and futuristic. 
    *   *Usage:* Use `display-lg` (3.5rem) for hero statements with a -2% letter spacing.
    *   *Editorial Flourish:* Mix `display-md` with `label-sm` monospaced tags nested directly above titles to mimic file-path headers.
*   **Body & Titles (Manrope):** This provides the "Human" element within the machine.
    *   *Usage:* Use `body-lg` (1rem) for project descriptions. 
    *   *The Monospaced Effect:* All numerical data and labels must be set in a monospaced font or the `label-md` style to reinforce the software engineering context.

## 4. Elevation & Depth
In this design system, depth is not achieved through light and shadow, but through **Optical Layering** and **Luminance**.

*   **The Layering Principle:** Treat the UI as stacked sheets of polarized glass.
    *   Bottom: `surface_container_lowest` (#0e0e0e) for the "root" grid.
    *   Middle: `surface` (#131313) for main content sections.
    *   Top: `surface_bright` (#3a3939) for floating panels.
*   **Glassmorphism:** For overlays or navigation bars, use `surface_container` at 60% opacity with a `backdrop-filter: blur(12px)`. This creates a "frosted terminal" effect that lets neon accents from the background bleed through.
*   **Ambient Glows:** Instead of shadows, use "Glows." If an element is elevated, give it a `box-shadow` using the `primary` color at 10% opacity with a 20px blur. It should look like the screen is radiating light, not catching it.
*   **Ghost Borders:** When containment is required for inputs or cards, use the `outline` token (#849495) at 20% opacity. All corners must be **0px (Strictly Square)**.

## 5. Components

### Buttons
*   **Primary:** Solid `primary_container` background with `on_primary_container` text. **0px border-radius.**
*   **Secondary:** Ghost style. `outline` border (20% opacity) with a `secondary` glow on hover.
*   **Interaction:** On hover, implement a 2px "Glitch Offset" where the button text shifts slightly or a pseudo-element creates a pink/blue color split effect.

### Chips & Tags
*   Technical metadata (e.g., "React", "Rust") should use `surface_container_high` with a 1px left-hand border of `tertiary`. Text should be `label-sm`.

### Input Fields
*   Never use a 4-sided box. Use a bottom-border only (`outline_variant`) or a semi-transparent `surface_container_highest` block.
*   Active state: The bottom border transforms into a `primary` glow.

### Cards & Lists
*   **No Dividers:** Separate list items using a 16px vertical gap and a background shift to `surface_container_low` on hover.
*   **Grid Pattern:** Use a CSS-generated grid background (10px x 10px) inside `surface_container_lowest` sections to ground the components in a technical space.

### Additional: The "Status Monitor"
*   A bespoke component for software portfolios. A small floating panel in the corner using `surface_container_high` that displays "System Health: Optimal" and a real-time clock, using `tertiary` (#e9ffa8).

## 6. Do's and Don'ts

### Do:
*   **Do** use intentional asymmetry. Place a narrow technical sidebar next to a wide, expansive content block.
*   **Do** lean into the "Hard Edge." Every corner is 0px. No exceptions.
*   **Do** use code-like syntax in UI labels (e.g., `[01] SECTION_NAME` instead of just "About Me").
*   **Do** ensure high accessibility by keeping text on the `on_surface` (#e5e2e1) spectrum.

### Don't:
*   **Don't** use standard drop shadows. If it doesn't glow or layer, it doesn't belong.
*   **Don't** use rounded corners (`border-radius: 0 !important`). It breaks the terminal immersion.
*   **Don't** use vibrant neons for large-scale backgrounds. Neons are for "light emission" (lines, text, icons), not for massive surfaces.
*   **Don't** over-animate glitches. A glitch should be a subtle reward for interaction, not a constant distraction that hinders readability.