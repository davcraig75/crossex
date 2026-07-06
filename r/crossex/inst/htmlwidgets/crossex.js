HTMLWidgets.widget({
  name: 'crossex',
  type: 'output',

  factory: function(el, width, height) {
    return {
      renderValue: function(x) {
        // fresh inner node per render: the library replaces its innerHTML
        el.innerHTML = '';
        var inner = document.createElement('div');
        inner.id = el.id + '_cc';
        inner.style.width = '100%';
        el.appendChild(inner);
        var rows = HTMLWidgets.dataframeToD3(x.data);
        window.crossex(inner.id, rows, x.options, el.id);
      },

      resize: function(width, height) {
        // the library re-measures its container on window resize events
      }
    };
  }
});
