/// <reference types="react" />
import * as React from 'react';
import 'isomorphic-fetch';
export interface Props {
    src: any;
    color?: string;
    width?: number;
    height?: number;
    className?: string;
    rotate?: number;
    stroke?: boolean;
    strokeWidth?: number;
    [key: string]: any;
}
export interface State {
    src: string | null;
}
export default class Icon extends React.PureComponent<Props, State> {
    cache: {
        [key: string]: string;
    };
    constructor(props: any);
    componentWillReceiveProps(nextProps: any): void;
    fetch(props?: Props & {
        children?: {} | undefined;
    }): void;
    render(): JSX.Element | null;
}
