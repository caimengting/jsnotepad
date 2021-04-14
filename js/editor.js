function comList() {
	let $comList = $(
		`
    <div class="notepad-com-list">
      <input class="editor" type="text"><br>
      <ul class="list">
      </ul>
    </div>`
	);

	let $editor = $comList.find('.editor'),
		$list = $comList.find('.list'),
		$items;

	let cfg = {
		container: '',
		list: [],
		select: 0,
		width: '200px',
		isFont: false,
		isFontStyle: false,
		selectHandler: null
	};

	let fillData = () => {
		let i = 0,
			$item;

		if (cfg.isFont) {
			for (i = 0; i < cfg.list.length; i++) {
				$item = $('<li class="item"></li>');
				$item.css({
					'font-family': cfg.list[i]
				});
				$list.append($item.html(cfg.list[i]));
			}
		} else if (cfg.isFontStyle) {
			for (i = 0; i < cfg.list.length; i++) {
				$item = $('<li class="item"></li>');
				np.setFontStyle($item, cfg.list[i]);
				$list.append($item.html(cfg.list[i]));
			}
		} else {
			for (i = 0; i < cfg.list.length; i++) {
				$item = $('<li class="item"></li>');
				$list.append($item.html(cfg.list[i]));
			}
		}

		$items = $list.find('.item');
	};

	let setSelect = (n) => {
		$($items[n]).addClass('selected');
		$editor.val(cfg.list[n]);
		$editor.select();
		$items[n].scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		});
	};

	let init = () => {
		let $oldList = $(cfg.container).find('.notepad-com-list');
		if ($oldList.length !== 0) $oldList.remove();

		$(cfg.container).append($comList);

		$comList.css({
			width: cfg.width
		});
		fillData();
		setSelect(cfg.select);
	};

	this.show = (conf) => {
		$.extend(cfg, conf);
		init();

		$list.click((e) => {
			$($items[cfg.select]).removeClass('selected');
			cfg.select = cfg.list.indexOf($(e.target).html());
			$($items[cfg.select]).addClass('selected');
			$editor.val(cfg.list[cfg.select]);
			$editor.select();
			cfg.selectHandler(cfg.select);
		});

		$editor.keyup(() => {
			let i = 0;

			for (i = 0; i < cfg.list.length; i++) {
				if (cfg.list[i].indexOf($editor.val()) === 0) break;
			}

			if (i === cfg.list.length) return;

			$items[i].scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
			$($items[cfg.select]).removeClass('selected');
			$($items[i]).addClass('selected');
			cfg.select = i;
		});
	};
}
let $menubar = (() => {
	let $bar = $('<div class="notepad-menubar"></div>');

	let menuData,
		menus = [];
	let active = -1;

	let createMenuTitle = () => {
		let $titles = $('<ul class="menu-title"></ul>');

		for (let i = 0; i < menuData.length; i++) {
			let $title = $('<li class="title"></li>');

			$title.html(menuData[i].title);
			$title.attr('data-id', i);
			$titles.append($title);

			$title.click((e) => {
				let i = Number(e.target.dataset.id);

				if (active === -1) {
					menus[i].css({
						display: 'inline-block'
					});
					active = i;
				} else if (active !== i) {
					menus[active].css({
						display: 'none'
					});
					menus[i].css({
						display: 'inline-block'
					});
					active = i;
				} else {
					menus[active].css({
						display: 'none'
					});
					active = -1;
				}

				e.stopPropagation();
			});

			$title.hover((e) => {
				if (active !== -1) {
					let i = Number(e.target.dataset.id);

					menus[active].css({
						display: 'none'
					});
					menus[i].css({
						display: 'inline-block'
					});
					active = i;
				}
			});
		}

		$bar.append($titles);
	};

	let createMenus = () => {
		for (let i = 0; i < menuData.length; i++) {
			let $menus = $('<ul class="menus"></ul>'),
				items = menuData[i].menuItems;

			for (let j = 0; j < items.length; j++) {
				if (items[j].title === 'hr') {
					let $hr = $('<li class="menu-hr"></li>');
					$menus.append($hr);
					continue;
				}

				let $menu = $('<li class="menu-item"></li>');

				$menu.html(items[j].title);
				$menu.attr('data-x', i);
				$menu.attr('data-y', j);

				if (items[j].shortcut !== '') {
					let $shorcut = $('<span class="shortcut"></span>');

					$shorcut.html(items[j].shortcut);
					$menu.append($shorcut);
				}

				if (!items[j].enabled) $menu.addClass('disabled');

				$menus.append($menu);

				$menu.click((e) => {
					e.stopPropagation();

					if ($(e.target).hasClass('disabled')) return;

					let i = e.target.dataset.x,
						j = e.target.dataset.y;

					menus[i].css({
						display: 'none'
					});
					active = -1;

					menuData[i].menuItems[j].handler();
				});
			}

			$menus.css({
				width: menuData[i].width,
				left: menuData[i].left,
				display: 'none'
			});

			$bar.append($menus);
			menus.push($menus);
		}
	};

	let checked = (row, col, isChecked) => {
		let menuItem = menus[row].find('.menu-item')[col];

		if (isChecked) {
			$(menuItem).prepend($('<span class="checked">✓</span>')[0]);
		} else {
			$(menuItem).find('.checked').remove();
		}
	};

	let enabled = (row, col, isEnabled) => {
		let menuItem = menus[row].find('.menu-item')[col];

		if (isEnabled) {
			$(menuItem).removeClass('disabled');
		} else {
			$(menuItem).addClass('disabled');
		}
	};

	let hideMenu = () => {
		if (active === -1) return;

		menus[active].css({
			display: 'none'
		});
		active = -1;
	};

	let show = (data) => {
		menuData = data;
		createMenuTitle();
		createMenus();

		$('body').append($bar);
	};

	return {
		show,
		checked,
		enabled,
		hideMenu
	};
})();

let $editor = (() => {
	let $DOM = $(
		`
    <div class="notepad-editor">
      <textarea spellcheck="false" auto-size="none"></textarea>
    </div>`);

	let $textArea = $DOM.find('textarea');

	let cfg = {
		wrap: false,
		posHandler: null,
		contentHandler: null
	};

	let bSelect = false;

	let resize = (isBig) => {
		if (isBig) {
			$DOM.css({
				bottom: '21px'
			});
		} else {
			$DOM.css({
				bottom: '0'
			});
		}
	};

	let focus = () => $textArea.focus();

	$textArea.keyup(() => {
		cfg.posHandler(getRow(), getCol());
		cfg.contentHandler($textArea.val() !== '');
	});

	$textArea.keypress(() => {
		let title = $('title').html();

		if (title[0] !== '*') {
			$('title').text('*' + title);
		}

		np.hasChanged = true;

		cfg.posHandler(getRow(), getCol());
	});

	$textArea.mousedown(() => bSelect = true);
	$textArea.mouseup(() => bSelect = false);
	$textArea.mousemove(() => {
		if (bSelect) cfg.posHandler(getRow(), getCol());
	});
	$textArea.click(() => cfg.posHandler(getRow(), getCol()));

	let getCol = () => {
		let sub = $textArea.val().substr(0, $textArea[0].selectionStart);
		let subs = sub.split('\n');

		return subs[subs.length - 1].length + 1;
	};

	let getRow = () => {
		let sub = $textArea.val().substr(0, $textArea[0].selectionStart);
		return sub.split('\n').length;
	};

	let getTotalLn = () => $textArea.val().split('\n').length;

	let setWrap = (bWrap) => {
		if (bWrap) {
			$textArea.attr('wrap', 'soft');
			$textArea.css({
				'overflow-x': 'hidden'
			});
		} else {
			$textArea.attr('wrap', 'off');
			$textArea.css({
				'overflow-x': 'scroll'
			});
		}
	};

	let setFont = (e) => {
		$textArea.css({
			'font-family': e.family,
			'font-size': e.size + 'pt'
		});
		np.setFontStyle($textArea, e.style);
	};

	let selectAll = () => {
		let n = $textArea.val().length;

		$textArea[0].selectionStart = 0;
		$textArea[0].selectionEnd = n;

		$textArea.select();
	};

	let insertDataTime = () => {
		let str = $textArea.val();

		let strLeft = str.substring(0, $textArea[0].selectionStart),
			strRight = str.substring($textArea[0].selectionEnd, str.length);

		str = strLeft + new Date().toLocaleString() + strRight;

		$textArea.val(str);
		$textArea.focus();
		cfg.posHandler(getRow(), getCol());
	};

	let gotoLn = (num) => {
		let str = $textArea.val(),
			m = 0;

		let aryStr = str.split('\n');
		for (let i = 0; i < num - 1; i++) {
			m += aryStr[i].length + 1;
		}

		$textArea[0].selectionStart = m;
		$textArea[0].selectionEnd = m;
		$textArea.focus();
		cfg.posHandler(getRow(), getCol());
	};

	let bingSearch = () => {
		let start = $textArea[0].selectionStart,
			end = $textArea[0].selectionEnd;

		if (start === end) {
			window.open('https://cn.bing.com/', '_blank');
		} else {
			let subStr = $textArea.val().substring(start, end);
			window.open('https://cn.bing.com/search?q=' + subStr, '_blank');
		}
	};

	let search = (srch) => {
		let content = $textArea.val(),
			srchCtnt = srch.content;

		if (!srch.capitalSense) { // 不区分大小写，把所有字符串都转换成小写
			content = content.toLowerCase();
			srchCtnt = srchCtnt.toLowerCase();
		}

		let start = $textArea[0].selectionEnd;
		let result;

		if (srch.direction === 'down') { // 查找方向，向下
			result = content.indexOf(srchCtnt, start);
		} else { // srch.direction === 'up'，查找方向，向上
			let subStr = content.substr(0, $textArea[0].selectionStart);
			result = subStr.lastIndexOf(srchCtnt);
		}

		if (result === -1) {
			alert('找不到 "' + srch.content + '"');
			return;
		}

		$textArea[0].selectionStart = result;
		$textArea[0].selectionEnd = result + srchCtnt.length;

		cfg.posHandler(getRow(), getCol());
	};

	let newFile = () => $textArea.val('');
	let getContent = () => $textArea.val();
	let setContent = (data) => $textArea.val(data);

	let show = (conf) => {
		$.extend(cfg, conf);

		$('body').append($DOM);
		$textArea.trigger('focus');
		setWrap(cfg.wrap);
	};

	return {
		show,
		resize,
		focus,
		getTotalLn,
		getRow,
		getCol,
		getContent,
		setContent,
		setWrap,
		newFile,
		selectAll,
		insertDataTime,
		gotoLn,
		bingSearch,
		search,
		setFont
	};
})();
