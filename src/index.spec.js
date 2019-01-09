import { expect } from 'chai';
import server from './index';

describe("server", function () {
  it("server should exist.", function () {
    expect(server).to.exist;
  });
  it("server can listen.", function () {
    expect(server.listen).to.exist;
  });
});