let np = {};          
np.config = {
  'appContainer': '.notepad-app'
};

np.bShowStatusBar = localStorage.getItem('bShowStatusBar') || false;   // 是否显示状态栏
np.fontFamily     = localStorage.getItem('fontFamily') || 'Arial';     // 默认字体
np.fontStyle      = localStorage.getItem('fontStyle') || '常规';       // 默认字体样式
np.fontSize       = localStorage.getItem('fontSize') || '16';          // 默认字体大小：16pt

 
np.setFontStyle = (item, style) => {
  let conf = {
    '常规':   {'font-weight': 'normal', 'font-style': 'normal'},
    '斜体':   {'font-weight': 'normal', 'font-style': 'italic'},
    '粗体':   {'font-weight': 'bold',   'font-style': 'normal'},
    '粗斜体': {'font-weight': 'bold',   'font-style': 'italic'}
  };

  item.css(conf[style]);
};

np.fontHandler = (e) => {
  np.fontFamily = e.family;
  np.fontStyle  = e.style;
  np.fontSize   = e.size;

  localStorage.setItem('fontFamily', np.fontFamily);
  localStorage.setItem('fontStyle',  np.fontStyle);
  localStorage.setItem('fontSize',   np.fontSize);

  $editor.setFont(e);
};

$(() => {
  $menubar.show(np.menuData);
  $editor.show({
    posHandler: (row, col) => {
      $statusBar.setRowCol(row, col);
    },
    contentHandler: (isEmpty) => {
      $menubar.enabled(1, 6, isEmpty);
    }
  });

  $editor.setFont({
    family: np.fontFamily,
    style:  np.fontStyle,
    size:   np.fontSize
  });

  $statusBar.init();
  $statusBar.display(np.bShowStatusBar === 'true');

  $menubar.checked(3, 0, np.bShowStatusBar === 'true');

  let $app = $('body');

  $app.click(() => {
    $menubar.hideMenu();
    $editor.focus();
  });
});
