"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var React = require("react");
var objectAssign = require('object-assign');
require("isomorphic-fetch");
var Icon = (function (_super) {
    __extends(Icon, _super);
    function Icon(props) {
        var _this = _super.call(this, props) || this;
        _this.cache = {};
        var src = _this.props.src;
        var match = src.match(/data:image\/svg[^,]*?(;base64)?,(.*)/);
        if (match && match[1] && match[2]) {
            src = atob(match[2]);
        }
        if (src.match(/\.svg$/)) {
            src = null;
            _this.fetch(props);
        }
        _this.state = {
            src: src,
        };
        return _this;
    }
    Icon.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.src &&
            nextProps.src.match(/\.svg$/) &&
            nextProps.src !== this.props.src &&
            !this.cache[nextProps.src]) {
            this.fetch(nextProps);
        }
        else if (nextProps.src.match(/data:image\/svg[^,]*?(;base64)?,(.*)/) ||
            nextProps.src.match(/^<svg/)) {
            this.setState({ src: nextProps.src });
        }
    };
    Icon.prototype.fetch = function (props) {
        var _this = this;
        if (props === void 0) { props = this.props; }
        if (this.cache && this.cache[props.src]) {
            this.setState({ src: this.cache[props.src] });
        }
        fetch(props.src)
            .then(function (res) { return res.text(); })
            .then(function (src) {
            _this.cache[props.src] = src;
            _this.setState({ src: src });
        });
    };
    Icon.prototype.render = function () {
        var src = this.state.src;
        if (!src) {
            return null;
        }
        var width = this.props.width || 16;
        var height = this.props.height || 16;
        var color = this.props.color || '#000';
        var stroke = this.props.stroke || false;
        var strokeWidth = this.props.strokeWidth || 1;
        var rotate = this.props.rotate || 0;
        var fillCode = !stroke ? "fill=\"" + color + "\"" : 'fill="none"';
        var strokeCode = stroke
            ? "stroke=\"" + color + "\" stroke-width=\"" + strokeWidth + "px\""
            : 'stroke="none"';
        var styleCode = "style=\"width: " + width + "px; height: " + height + "px;\"";
        var html = src.replace(/<svg/, "<svg " + strokeCode + " " + fillCode + " " + styleCode);
        var restProps = objectAssign({}, this.props);
        delete restProps.width;
        delete restProps.height;
        delete restProps.stroke;
        delete restProps.strokeWidth;
        delete restProps.color;
        delete restProps.src;
        delete restProps.className;
        return (React.createElement("i", __assign({}, restProps, { className: this.props.className, style: {
                transform: "rotate(" + rotate + "deg)",
                WebkitTransform: "rotate(" + rotate + "deg)",
                display: 'flex',
            }, dangerouslySetInnerHTML: { __html: html } })));
    };
    return Icon;
}(React.PureComponent));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Icon;
//# sourceMappingURL=Icon.js.map