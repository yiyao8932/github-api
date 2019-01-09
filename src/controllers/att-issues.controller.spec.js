import { expect } from 'chai';
import { getAttIssues } from './att-issues.controllers';

describe("issues controller", function () {
  it("getAttIssues should exist.", function () {
    expect(getAttIssues).to.exist;
  });
  it("getAttIssues can return.", function () {
    expect(getAttIssues()).to.exist;
  });
  it("getAttIssues can return.", async function () {
    const issues = await getAttIssues();
    expect(issues).to.exist;
    expect(issues.length).be.above(0);
  });
});