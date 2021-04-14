let $dlgFont = new Dialog('font');

((dlg) => {
  let content = `
    <div class="font-family"><p>字体(F):</p></div>
    <div class="font-style"><p>字形(Y):</p></div>
    <div class="font-size"><p>大小(S):</p></div>
    <fieldset class="sample">
      <legend>示例</legend>
      <p class="sample-txt">AaBbYyZz</p>
    </fieldset>
    <div class="script">
      <label>
        脚本(R):<br>
        <select>
          <option value="西欧语言">西欧语言</option>
          <option value="中文 GB2312">中文 GB2312</option>
        </select>
      </label>
    </div>
    <input class="btn-ok btn" type="button" value="确定">
    <input class="btn-cancel btn" type="button" value="取消">`;

  let $dlg       = dlg.generate(content, '字体');

  let $btnOk     = $dlg.find('.btn-ok'),
      $btnCancel = $dlg.find('.btn-cancel'),
      $sample    = $dlg.find('.sample-txt');

  let fonts = ['Agency FB', 'Algerian', 'Arial', 'Arial Rounded MT', 'Axure Handwriting', 'Bahnschrift', 'Baskerville Old Face', 'Bauhaus 93', 'Bell MT', 'Berlin Sans FB', 'Bernard MT', 'BlackAdder ITC'],
      styles = ['常规', '斜体', '粗体', '粗斜体'],
      sizes = ['8', '9', '10', '11', '12', '14', '16', '18', '20', '22', '24', '26', '28', '36', '48', '72'];

  let cfg = {
    family:    'Arial',
    style:     '常规',
    size:      '16',
    okHandler: null
  };

  let sample = () => {
    $sample.css({ 'font-family': cfg.family, 'font-size': cfg.size + 'pt' });
    np.setFontStyle($sample, cfg.style);
  };

  let initList = () => {
    let lstFamily = new comList();
    lstFamily.show({
      container: '.notepad-dlg-font .font-family',
      width:     '176px',
      list:      fonts,
      select:    fonts.indexOf(cfg.family),
      isFont:    true,
      selectHandler: (e) => {
        cfg.family = fonts[e];
        sample();
      }
    });

    let lstStyle = new comList();
    lstStyle.show({
      container:   '.notepad-dlg-font .font-style',
      width:       '132px',
      list:        styles,
      select:      styles.indexOf(cfg.style),
      isFontStyle: true,
      selectHandler: (e) => {
        cfg.style = styles[e];
        sample();
      }
    });

    let lstSize = new comList();
    lstSize.show({
      container: '.notepad-dlg-font .font-size',
      width:     '64px',
      list:      sizes,
      select:    sizes.indexOf(cfg.size),
      selectHandler: (e) => {
        cfg.size = sizes[e];
        sample();
      }
    });

    sample();
  };

  dlg.show = (conf) => {
    $.extend(cfg, conf);

    $('body').append($dlg);
    dlg.init();
    initList();

    $btnCancel.click(dlg.destory);
    $btnOk.click(() => {
      cfg.okHandler({
        family: cfg.family,
        style:  cfg.style,
        size:   cfg.size
      });

      dlg.destory();
    });

    $dlg.click((e) => e.stopPropagation());
  };
})($dlgFont);

function Dialog (name, model = true) {
  let $dlg = $(`
    <div class="notepad-dlg-mask">
      <div class="dialogbox notepad-dlgbox">
        <div class="notepad-dlg-titlebar">
          <p class="title"></p>
          <span class="close-btn" title="关闭">✖</span>
        </div>
        <div class="main notepad-dlg-main">
        </div>
      </div>
    </div>`);

  let $btnClose = $dlg.find('.close-btn'),
      $titleBar = $dlg.find('.notepad-dlg-titlebar'),
      clsName   = 'notepad-dlg-' + name;

  this.destory = () => $dlg.remove();

  this.generate = (content, title) => {
    let $content = $dlg.find('.main'),
        $title   = $dlg.find('.title');

    $content.html(content);
    $title.html(title);
    $dlg.addClass(clsName);

    if(!model) $dlg.removeClass('notepad-dlg-mask');

    return $dlg;
  };

  this.init = () => {
    $dlg.find('.dialogbox').draggable({handle: $titleBar});
    $btnClose.click(this.destory);
  };
}
let $dlgSearch = new Dialog('search', false);

((dlg) => {
  let content = `
    <label>查找内容(N): <input class="txt-content" type="text" autofocus></label><br>
    <label><input type="checkbox" value="capital-sense">区分大小写(C)</label>
    <fieldset class="search-direction">
      <legend>方向</legend>
      <label><input type="radio" name="direction" value="up">向上(U)</label>
      <label><input type="radio" name="direction" value="down" checked>向下(D)</label>
    </fieldset>
    <input class="btn-search btn" type="button" value="查找下一个(F)" disabled>
    <input class="btn-cancel btn" type="button" value="取消">`;

  let $dlg        = dlg.generate(content, '查找');
  let $btnCancel  = $dlg.find('.btn-cancel'),
      $btnSearch  = $dlg.find('.btn-search'),
      $txtContent = $dlg.find('.txt-content');

  let verify = () => {
    if($txtContent.val() !== '') {
      $btnSearch.removeAttr('disabled');
    } else {
      $btnSearch.attr('disabled', 'disabled');
    }
  };

  let initState = () => {
    $dlg.find('input[value="up"]').removeAttr('checked');
    $dlg.find('input[value="down"]')[0].checked = true;
    $dlg.find('input[type="checkbox"]').removeAttr('checked');
    $btnSearch.attr('disabled', 'disabled');
    $txtContent.val('');
    $txtContent.focus();
  };

  dlg.show = (searchHandler) => {
    $('body').append($dlg);
    dlg.init();
    initState();

    $btnCancel.click(dlg.destory);
    $txtContent.keyup(verify);
    $btnSearch.click(() => searchHandler({
      content:      $txtContent.val(),
      capitalSense: $dlg.find('input[type="checkbox"]:checked').val() === 'capital-sense',
      direction:    $dlg.find('input[name="direction"]:checked').val()
    }));

    $txtContent.click((e) => e.stopPropagation());
  };
})($dlgSearch);
let $statusBar = (() => {
	let $stBar = $(
		`
    <div class="notepad-statusbar">
      <div class="left-panel"></div>
      <div class="right-panel">
        <p class="row-col"></p>
      </div>
    </div>`
	);

	let $rowCol = $stBar.find('.row-col'),
		strRowCol = '第&nbsp;x&nbsp;行，第&nbsp;y&nbsp;列',
		cfg = {
			row: 1,
			col: 1
		};

	let display = (isVisable) => $stBar.css('display', isVisable ? 'block' : 'none');

	let setRowCol = (r, c) => $rowCol.html(strRowCol.replace('x', r).replace('y', c));

	let init = (conf) => {
		$.extend(cfg, conf);
		setRowCol(cfg.row, cfg.col);
		$('body').append($stBar);
	};

	return {
		init,
		setRowCol,
		display
	};
})();
