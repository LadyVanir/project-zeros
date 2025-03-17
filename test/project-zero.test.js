import { html, fixture, expect } from '@open-wc/testing';
import "../project-zero.js";

describe("ProjectZero test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <project-zero
        title="title"
      ></project-zero>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
