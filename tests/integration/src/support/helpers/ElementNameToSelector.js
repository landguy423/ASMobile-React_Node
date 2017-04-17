/**
* transform a more readable section name to a css selector
* @param {String} a css selector or section name
*/

module.exports = (names) => {
  const 
      side_menu = /((^|[^-^#^.^_])[Ss]ide [Mm]enu)/,
      header = /((^|[^-^#^.^_])header)/,
      main_section = /((^|[^-^#^.^_])[Mm]ain [Ss]ection)/,
      join_section = /((^|[^-^#^.^_])[Jj]oin [Ss]ection)/,
      app_section = /((^|[^-^#^.^_])[Aa]pp [Ss]ection)/,
      community_section = /((^|[^-^#^.^_])[Cc]ommunity [Ss]ection)/,
      connected_section = /((^|[^-^#^.^_])[Cc]onnected [Ss]ection)/,
      footer = /((^|[^-^#^.^_])footer)/,
      ios_text = /([Ii][Oo][Ss]_[Tt][Ee][Xx][Tt])/,
      ios_text_field = /([Ii][Oo][Ss]_[Tt][Ee][Xx][Tt]_[Ff][Ii][Ee][Ll][Dd])/,
      ios_secure_text = /([Ii][Oo][Ss]_[Ss][Ee][Cc][Uu][Rr][Ee]_[Tt][Ee][Xx][Tt])/,
      ios_app = /([Ii][Oo][Ss]_[Aa][Pp][Pp])/,
      ios_other = /([Ii][Oo][Ss]_[Oo][Tt][Hh][Ee][Rr])/,
      ios_window = /([Ii][Oo][Ss]_[Ww][Ii][Nn][Dd][Oo][Ww])/,
      ios_button = /([Ii][Oo][Ss]_[Bb][Uu][Tt][Tt][Oo][Nn])/,
      ios_alert = /([Ii][Oo][Ss]_[Aa][Ll][Ee][Rr][Tt])/,
      ios_switch = /([Ii][Oo][Ss]_[Ss][Ww][Ii][Tt][Cc][Hh])/,
      ios_registration_btn = /[Ii][Oo][Ss]_[Rr][Ee][Gg][Ii][Ss][Tt][Rr][Aa][Tt][Ii][Oo][Nn]_[Bb][Tt][Nn]/,
      empty = /\s+/,
      not_empty = (s) => s != '';

  let splitter = [empty, side_menu, main_section, 
    join_section, app_section, community_section, connected_section]
      .reduce((acc, val) => acc + '|' + val.source, '');
  
  // split the names into individual parts
  names = names.trim().split(splitter).filter(not_empty);
  
  function subselector(index){
    return name.slice(index, name.length).join(' ');
  }

  function mapShortNameToSelector(selector){ 
    if(side_menu.test(selector)){
      // for side menu
      return '';
    }
    if(header.test(selector)){
      return ''; 
    }
    if(main_section.test(selector)){
      // for main section
      return selector.replace(main_section, '#topot');
    }
    if(join_section.test(selector)){
      // for join section
      return selector.replace(join_Section, '#topot + div');
    }
    if(app_section.test(selector)){
      // for app section
      return selector.replace(app_section, '#topot + div + div');
    }
    if(community_section.test(selector)){
      // for community section
      return selector.replace(community_section, '#topot + div + div + div');
    }
    if(connected_section.test(selector)){
      // for connected section
      return selector.replace(connected_section, '#topot + div + div + div + div');
    }
    if(footer.test(selector)){
      // for footer
      return selector.replace(footer, '#footer');
    }
    if(ios_text_field.test(selector)){
      // unsecure text field
      return selector.replace(ios_text_field, '//XCUIElementTypeTextField');
    }
    if(ios_text.test(selector)){
      // for ios text element
      return selector.replace(ios_text, '//XCUIElementTypeStaticText');
    }
    if(ios_secure_text.test(selector)){
      // secure text field
      return selector.replace(ios_secure_text, '//XCUIElementTypeSecureTextField');
    }
    if(ios_app.test(selector)){
      // ios app element
      return selector.replace(ios_app, '//XCUIElementTypeApplication');
    }
    if(ios_other.test(selector)){
      // ios other element type
      return selector.replace(ios_other, '//XCUIElementTypeOther');
    }
    if(ios_window.test(selector)){
      // ios window element
      return selector.replace(ios_window, '//XCUIElementTypeWindow');
    }
    if(ios_button.test(selector)){
      // ios button
      return selector.replace(ios_button, '//XCUIElementTypeButton');
    }
    if(ios_alert.test(selector)){
      return selector.replace(ios_alert, '//XCUIElementTypeAlert');
    }
    if(ios_switch.test(selector)){
      return selector.replace(ios_switch, '//XCUIElementTypeSwitch');
    }
    if(ios_registration_btn.test(selector)){
      return selector.replace(ios_registration_btn, '//XCUIElementTypeOther[23]');
    }
    
      // if there is no special name just return the original selector
      return selector;
    }
  // replace the names with their actual selector 
  return names.map(mapShortNameToSelector).join(' ');
}
