 np.menuData = [{
  title: '文件(F)',
  menuItems: [{
    title: '新建(N)',
    shortcut: 'Ctrl+N',
    enabled: true,
    handler: () => console.log('新建')
  }, {
    title: '打开(O)...',
    shortcut: 'Ctrl+O',
    enabled: true,
    handler: () => console.log('打开')
  }, {
    title: '保存(S)',
    shortcut: 'Ctrl+S',
    enabled: true,
    handler: () => console.log('保存')
  }, {
    title: '另存为(A)...',
    shortcut: '',
    enabled: true,
    handler: () => console.log('另存为')
  }, {
    title: 'hr',
    shortcut: '',
    enabled: true,
    handler: null
  }, {
    title: '页面设置(U)...',
    shortcut: '',
    enabled: true,
    handler: () => console.log('页面设置')
  }, {
    title: '打印(P)...',
    shortcut: 'Ctrl+P',
    enabled: true,
    handler: () => console.log('打印')
  }, {
    title: 'hr',
    shortcut: '',
    enabled: true,
    handler: null
  }, {
    title: '退出(X)',
    shortcut: '',
    enabled: true,
    handler: () => console.log('退出 ')
  }],
  width: '202px',
  left: '0px'
}, {
  title: '编辑(E)',
  menuItems: [{
    title: '撤销(U)',
    shortcut: 'Ctrl+Z',
    enabled: true,
    handler: () => console.log('撤销') 
  }, {
    title: 'hr',
    shortcut: '',
    enabled: true,
    handler: null
  }, {
    title: '剪切(T)',
    shortcut: 'Ctrl+X',
    enabled: true,
    handler: () => console.log('剪切')
  }, {
    title: '复制(C)',
    shortcut: 'Ctrl+C',
    enabled: true,
    handler: () => console.log('复制')
  }, {
    title: '粘贴(P)',
    shortcut: 'Ctrl+V',
    enabled: true,
    handler: () => console.log('粘贴')
  }, {
    title: '删除(L)',
    shortcut: 'Del',
    enabled: true,
    handler: () => console.log('删除')
  }, {
    title: 'hr',
    shortcut: '',
    enabled: true,
    handler: null
  }, {
    title: '使用 Bing 搜索...',
    shortcut: 'Ctrl+E',
    enabled: true,
    handler: () => console.log('Bing搜索')
  }, {
    title: '查找(F)...',
    shortcut: 'Ctrl+F',
    enabled: true,
    handler: () => $dlgSearch.show((srch) => $editor.search(srch))
  }, {
    title: '查找下一个(N)',
    shortcut: 'F3',
    enabled: true,
    handler: () => console.log('查找下一个')
  }, {
    title: '替换(R)...',
    shortcut: 'Ctrl+H',
    enabled: true,
    handler: () => console.log('替换')
  }, {
    title: '转到(G)...',
    shortcut: 'Ctrl+G',
    enabled: true,
    handler: () => console.log('转到')
  }, {
    title: 'hr',
    shortcut: '',
    enabled: true,
    handler: null
  }, {
    title: '全选(A)',
    shortcut: 'Ctrl+A',
    enabled: true,
    handler: () => $editor.selectAll()
  }, {
    title: '时间/日期(D)',
    shortcut: 'F5',
    enabled: true,
    handler: () => $editor.insertDataTime()
  }],
  width: '218px',
  left: '52px'
}, {
  title: '格式(O)',
  menuItems: [{
    title: '自动换行(W)',
    shortcut: '',
    enabled: true,
    handler: () => console.log('自动换行')
  }, {
    title: '字体(F)...',
    shortcut: '',
    enabled: true,
    handler: () => $dlgFont.show({
      family: np.fontFamily,
      style: np.fontStyle,
      size: np.fontSize,
      okHandler: np.fontHandler
    })
  }],
  width: '156px',
  left: '106px'
}, {
  title: '查看(V)',
  menuItems: [{
    title: '状态栏(S)',
    shortcut: '',
    enabled: true,
    handler: () => {
      np.bShowStatusBar = !(typeof(np.bShowStatusBar) === 'boolean' ?
        np.bShowStatusBar :
        np.bShowStatusBar === 'true') ;
      localStorage.setItem('bShowStatusBar', np.bShowStatusBar);
      $statusBar.display(np.bShowStatusBar);
      $menubar.checked(3, 0, np.bShowStatusBar);
      $editor.resize(np.bShowStatusBar);
    }
  }],
  width: '138px',
  left: '162px'
}, {
  title: '帮助(H)',
  menuItems: [{
    title: '查看帮助(H)',
    shortcut: '',
    enabled: true,
    handler: () => console.log('查看帮助')
  }, {
    title: '关于记事本(A)',
    shortcut: '',
    enabled: true,
    handler: () => console.log('about')
  }],
  width: '166px',
  left: '216px'
}];
