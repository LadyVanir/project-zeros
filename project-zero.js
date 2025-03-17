/**
 * Copyright 2025 Olivia Sarsfield
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `project-zero`
 * 
 * @demo index.html
 * @element project-zero
 */
export class ProjectZero extends DDDSuper(I18NMixin(LitElement)) 
{

  static get tag() {
    return "project-zero";
  }

  constructor() {
    super();
    this.title = "";
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/project-zero.ar.json", import.meta.url).href +
        "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      h3 span {
        font-size: var(--project-zero-label-font-size, var(--ddd-font-size-s));
      }
    `];
  }

  async fetchContributors()
  {
    const url = 'https://api.github.com/repos/olivia-sarsfield/project-zero/contributors';
    try
    {
      const response = await fetch(url);
      if(!response.ok)
      {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      this.contributors = data.slice(0, this.limit)

    }
    catch(error)
    {
      console.error('There was a problem with your fetch operation:', error);
    }
  }

  // Lit render the HTML
  render() 
  {
    return html`
<div class="wrapper">
  <h3><span>${this.t.title}:</span> ${this.title}</h3>
  ${this.contributors.length > 0
    ? html`
        ${this.contributors.map(
        (contributor) => html`
         <div class="contributor">
         <img src="${contributor.avatar_url}" alt="${contributor.login}" />
         <div class="contributor-info">
          <a
           href="${contributor.html_url}"
              target="_blank"
              title="Visit ${contributor.login}'s GitHub"
             class="contributor-name" >
                  ${contributor.login}
                </a>
                <p>Contributions: ${contributor.contributions}</p>
              </div>
            </div>
          `
        )}
      `
    : html`<p>Loading contributors...</p>`}
  <slot></slot>
</div>
    `;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url).href;
  }
}

globalThis.customElements.define(ProjectZero.tag, ProjectZero);