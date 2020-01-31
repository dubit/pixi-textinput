!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("pixi.js")):"function"==typeof define&&define.amd?define(["exports","pixi.js"],e):e((t=t||self).ButtonTexture={},t.PIXI)}(this,(function(t,e){"use strict";class i extends e.Container{constructor(t){super(),this._input_style=Object.assign({position:"absolute",background:"none",border:"none",outline:"none",transformOrigin:"0 0",lineHeight:"1",rows:1,display:"none"},t.input),t.box?this._box_generator="function"==typeof t.box?t.box:new s(t.box):this._box_generator=null,this._input_style.hasOwnProperty("multiline")?(this._multiline=!!this._input_style.multiline,delete this._input_style.multiline):this._multiline=!1,this._box_cache={},this._previous={},this._dom_added=!1,this._dom_visible=!0,this._placeholder="",this._placeholderColor=11119017,this._selection=[0,0],this._restrict_value="",this._createDOMInput(),this.substituteText=!0,this._setState("DEFAULT"),this._addListeners()}get substituteText(){return this._substituted}set substituteText(t){this._substituted!=t&&(this._substituted=t,t?(this._createSurrogate(),this._dom_visible=!1):(this._destroySurrogate(),this._dom_visible=!0),this.placeholder=this._placeholder,this._update())}get placeholder(){return this._placeholder}set placeholder(t){this._placeholder=t,this._substituted?(this._updateSurrogate(),this._dom_input.placeholder=""):this._dom_input.placeholder=t}get disabled(){return this._disabled}set disabled(t){this._disabled=t,this._dom_input.disabled=t,this._setState(t?"DISABLED":"DEFAULT")}get maxLength(){return this._max_length}set maxLength(t){this._max_length=t,this._dom_input.setAttribute("maxlength",t)}get restrict(){return this._restrict_regex}set restrict(t){t instanceof RegExp?("^"!==(t=t.toString().slice(1,-1)).charAt(0)&&(t="^"+t),"$"!==t.charAt(t.length-1)&&(t+="$"),t=new RegExp(t)):t=new RegExp("^["+t+"]*$"),this._restrict_regex=t}get text(){return this._dom_input.value}set text(t){this._dom_input.value=t,this._substituted&&this._updateSurrogate()}get htmlInput(){return this._dom_input}focus(){this._substituted&&!this.dom_visible&&this._setDOMInputVisible(!0),this._dom_input.focus()}blur(){this._dom_input.blur()}select(){this.focus(),this._dom_input.select()}setInputStyle(t,e){this._input_style[t]=e,this._dom_input.style[t]=e,!this._substituted||"fontFamily"!==t&&"fontSize"!==t||this._updateFontMetrics(),this._last_renderer&&this._update()}destroy(t){this._dom_input&&this._dom_input.remove(),this._destroyBoxCache(),super.destroy(t)}_createDOMInput(){this._multiline?(this._dom_input=document.createElement("textarea"),this._dom_input.style.resize="none",this._dom_input.rows=this._input_style.rows):(this._dom_input=document.createElement("input"),this._dom_input.type="text",this._dom_input.spellcheck="true");for(let t in this._input_style)this._dom_input.style[t]=this._input_style[t]}_addListeners(){this.once("added",this._onAdded.bind(this)),this.once("removed",this._onRemoved.bind(this)),this._dom_input.addEventListener("input",this._onInputInput.bind(this)),this._dom_input.addEventListener("keyup",this._onInputKeyUp.bind(this)),this._dom_input.addEventListener("focus",this._onFocused.bind(this)),this._dom_input.addEventListener("blur",this._onBlurred.bind(this))}_onInputKeyDown(t){this._dom_added||(document.body.appendChild(this._dom_input),this._dom_input.style.display="none",this._dom_added=!0),this._selection=[this._dom_input.selectionStart,this._dom_input.selectionEnd],this.emit("keydown",t.keyCode)}_onInputInput(t){this._substituted&&this._updateSubstitution(),this.emit("input",this.text)}_onInputKeyUp(t){this.emit("keyup",t.keyCode)}_onFocused(){this._setState("FOCUSED"),this.emit("focus")}_onBlurred(){this._setState("DEFAULT"),this.emit("blur")}_onAdded(){requestAnimationFrame(()=>{this.parent&&(document.body.appendChild(this._dom_input),this._dom_input.style.display="none",this._dom_added=!0)})}_onRemoved(){this._dom_input.remove(),this._dom_added=!1}_setState(t){this.state=t,this._updateBox(),this._substituted&&this._updateSubstitution()}renderWebGL(t){super.renderWebGL(t),this._renderInternal(t)}renderCanvas(t){super.renderCanvas(t),this._renderInternal(t)}render(t){super.render(t),this._renderInternal(t)}_renderInternal(t){this._resolution=t.resolution,this._last_renderer=t,this._canvas_bounds=this._getCanvasBounds(),this._needsUpdate()&&this._update()}_update(){this._updateDOMInput(),this._substituted&&this._updateSurrogate(),this._updateBox()}_updateBox(){this._box_generator&&(this._needsNewBoxCache()&&this._buildBoxCache(),this.state==this._previous.state&&this._box==this._box_cache[this.state]||(this._box&&this.removeChild(this._box),this._box=this._box_cache[this.state],this.addChildAt(this._box,0),this._previous.state=this.state))}_updateSubstitution(){"FOCUSED"===this.state?(this._dom_visible=!0,this._surrogate.visible=0===this.text.length):(this._dom_visible=!1,this._surrogate.visible=!0),this._updateDOMInput(),this._updateSurrogate()}_updateDOMInput(){this._canvas_bounds&&(this._dom_input.style.top=this._canvas_bounds.top+"px",this._dom_input.style.left=this._canvas_bounds.left+"px",this._dom_input.style.transform=this._pixiMatrixToCSS(this._getDOMRelativeWorldTransform()),this._dom_input.style.opacity=this.worldAlpha,this._setDOMInputVisible(this.worldVisible&&this._dom_visible),this._previous.canvas_bounds=this._canvas_bounds,this._previous.world_transform=this.worldTransform.clone(),this._previous.world_alpha=this.worldAlpha,this._previous.world_visible=this.worldVisible)}_applyRestriction(){this._restrict_regex.test(this.text)?this._restrict_value=this.text:(this.text=this._restrict_value,this._dom_input.setSelectionRange(this._selection[0],this._selection[1]))}_needsUpdate(){return!this._comparePixiMatrices(this.worldTransform,this._previous.world_transform)||!this._compareClientRects(this._canvas_bounds,this._previous.canvas_bounds)||this.worldAlpha!=this._previous.world_alpha||this.worldVisible!=this._previous.world_visible}_needsNewBoxCache(){let t=this._getDOMInputBounds();return!this._previous.input_bounds||t.width!=this._previous.input_bounds.width||t.height!=this._previous.input_bounds.height}_createSurrogate(){this._surrogate_hitbox=new e.Graphics,this._surrogate_hitbox.alpha=0,this._surrogate_hitbox.interactive=!0,this._surrogate_hitbox.cursor="text",this._surrogate_hitbox.on("pointerdown",this._onSurrogateFocus.bind(this)),this.addChild(this._surrogate_hitbox),this._surrogate_mask=new e.Graphics,this.addChild(this._surrogate_mask),this._surrogate=new e.Text("",{}),this.addChild(this._surrogate),this._surrogate.mask=this._surrogate_mask,this._updateFontMetrics(),this._updateSurrogate()}_updateSurrogate(){let t=this._deriveSurrogatePadding(),e=this._getDOMInputBounds();this._surrogate.style=this._deriveSurrogateStyle(),this._surrogate.style.padding=Math.max.apply(Math,t),this._surrogate.y=this._multiline?t[0]:(e.height-this._surrogate.height)/2,this._surrogate.x=t[3],this._surrogate.text=this._deriveSurrogateText(),this._updateSurrogateHitbox(e),this._updateSurrogateMask(e,t)}_updateSurrogateHitbox(t){this._surrogate_hitbox.clear(),this._surrogate_hitbox.beginFill(0),this._surrogate_hitbox.drawRect(0,0,t.width,t.height),this._surrogate_hitbox.endFill(),this._surrogate_hitbox.interactive=!this._disabled}_updateSurrogateMask(t,e){this._surrogate_mask.clear(),this._surrogate_mask.beginFill(0),this._surrogate_mask.drawRect(e[3],0,t.width-e[3]-e[1],t.height),this._surrogate_mask.endFill()}_destroySurrogate(){this._surrogate&&(this.removeChild(this._surrogate),this.removeChild(this._surrogate_hitbox),this._surrogate.destroy(),this._surrogate_hitbox.destroy(),this._surrogate=null,this._surrogate_hitbox=null)}_onSurrogateFocus(){this._setDOMInputVisible(!0),setTimeout(this._ensureFocus.bind(this),10)}_ensureFocus(){this._hasFocus()||this.focus()}_deriveSurrogateStyle(){let t=new e.TextStyle;for(var i in this._input_style)switch(i){case"color":t.fill=this._input_style.color;break;case"fontFamily":case"fontSize":case"fontWeight":case"fontVariant":case"fontStyle":t[i]=this._input_style[i];break;case"letterSpacing":t.letterSpacing=parseFloat(this._input_style.letterSpacing)}return this._multiline&&(t.lineHeight=parseFloat(t.fontSize),t.wordWrap=!0,t.wordWrapWidth=this._getDOMInputBounds().width),0===this._dom_input.value.length&&(t.fill=this._placeholderColor),t}_deriveSurrogatePadding(){let t=this._input_style.textIndent?parseFloat(this._input_style.textIndent):0;if(this._input_style.padding&&this._input_style.padding.length>0){let e=this._input_style.padding.trim().split(" ");if(1==e.length){let i=parseFloat(e[0]);return[i,i,i,i+t]}if(2==e.length){let i=parseFloat(e[0]),s=parseFloat(e[1]);return[i,s,i,s+t]}if(4==e.length){let i=e.map(t=>parseFloat(t));return i[3]+=t,i}}return[0,0,0,t]}_deriveSurrogateText(){return 0===this._dom_input.value.length?this._placeholder:this._dom_input.value}_updateFontMetrics(){const t=this._deriveSurrogateStyle().toFontString();this._font_metrics=e.TextMetrics.measureFont(t)}_buildBoxCache(){this._destroyBoxCache();let t=["DEFAULT","FOCUSED","DISABLED"],e=this._getDOMInputBounds();for(let i in t)this._box_cache[t[i]]=this._box_generator(e.width,e.height,t[i]);this._previous.input_bounds=e}_destroyBoxCache(){this._box&&(this.removeChild(this._box),this._box=null);for(let t in this._box_cache)this._box_cache[t].destroy(),this._box_cache[t]=null,delete this._box_cache[t]}_hasFocus(){return document.activeElement===this._dom_input}_setDOMInputVisible(t){this._dom_input.style.display=t?"block":"none"}_getCanvasBounds(){let t=this._last_renderer.view.getBoundingClientRect(),e={top:t.top,left:t.left,width:t.width,height:t.height};return e.left+=window.scrollX,e.top+=window.scrollY,e}_getDOMInputBounds(){let t=!1;this._dom_added||(document.body.appendChild(this._dom_input),t=!0);let e=this._dom_input.style.transform,i=this._dom_input.style.display;this._dom_input.style.transform="",this._dom_input.style.display="inline-block";let s=this._dom_input.getBoundingClientRect();return this._dom_input.style.transform=e,this._dom_input.style.display=i,t&&document.body.removeChild(this._dom_input),s}_getDOMRelativeWorldTransform(){let t=this._last_renderer.view.getBoundingClientRect(),e=this.worldTransform.clone();return e.scale(this._resolution,this._resolution),e.scale(t.width/this._last_renderer.width,t.height/this._last_renderer.height),e}_pixiMatrixToCSS(t){return"matrix("+[t.a,t.b,t.c,t.d,t.tx,t.ty].join(",")+")"}_comparePixiMatrices(t,e){return!(!t||!e)&&(t.a==e.a&&t.b==e.b&&t.c==e.c&&t.d==e.d&&t.tx==e.tx&&t.ty==e.ty)}_compareClientRects(t,e){return!(!t||!e)&&(t.left==e.left&&t.top==e.top&&t.width==e.width&&t.height==e.height)}}function s(t){if((t=t||{fill:13421772}).default)t.focused=t.focused||t.default,t.disabled=t.disabled||t.default;else{let e=t;(t={}).default=t.focused=t.disabled=e}return function(i,s,o){let n=t[o.toLowerCase()],r=new e.Graphics;return n.fill&&r.beginFill(n.fill),n.stroke&&r.lineStyle(n.stroke.width||1,n.stroke.color||0,n.stroke.alpha||1),n.rounded?r.drawRoundedRect(0,0,i,s,n.rounded):r.drawRect(0,0,i,s),r.endFill(),r.closePath(),r}}class o extends e.utils.EventEmitter{constructor(t){super(t),this._options=t;const i=new e.Sprite(t.textureButton);i._btnMode=!0,i.anchor.set(t.anchor?t.anchor:.5),i.position.x=t.x,i.position.y=t.y,i.interactive=!0,i.on("mousedown",this.onButtonDown).on("touchstart",this.onButtonDown).on("mouseup",this.onButtonUp).on("touchend",this.onButtonUp).on("mouseupoutside",this.onButtonUp).on("touchendoutside",this.onButtonUp).on("mouseover",this.onButtonOver).on("mouseout",this.onButtonOut),this.button=i}getButtonFace(){return this.button}onButtonDown(){this.button.isdown=!0,this.emit("BUTTONDOWN"),this.button.texture=this._options.textureButtonDown,this.button.alpha=1,window.console.log("button down")}onButtonUp(){this.button.isdown=!1,this.button.isOver?(this.emit("BUTTONCONFIRM"),this.button.texture=this._options.textureButtonOver):(this.emit("BUTTONUP"),this.button.texture=this._options.textureButton),window.console.log("button up")}onButtonOver(){this.button.isOver=!0,this.emit("BUTTONOVER"),this.button.isdown||(this.button.texture=this._options.textureButtonOver)}onButtonOut(){this.button.isOver=!1,this.emit("BUTTONOUT"),this.button.isdown||(this.button.texture=this._options.textureButton)}}t.ButtonTexture=o,t.TextInput=i,Object.defineProperty(t,"__esModule",{value:!0})}));
//# sourceMappingURL=pixiTextInput.js.map
