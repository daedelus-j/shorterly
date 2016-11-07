'use strict';

export default (cb) => {
  return e => {
    e.preventDefault();
    cb();
  };
};
