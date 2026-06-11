// Stub OffscreenCanvas — not available in jsdom
global.OffscreenCanvas = class {
  constructor(w, h) {
    this.width = w;
    this.height = h;
  }
  getContext() {
    return {
      fillStyle: '',
      fillRect: () => {},
      getImageData: () => ({ data: new Uint8ClampedArray(this.width * this.height * 4) }),
      putImageData: () => {},
    };
  }
  toDataURL() {
    return 'data:image/png;base64,stub';
  }
};

// Reset localStorage between every test
beforeEach(() => {
  localStorage.clear();
});
