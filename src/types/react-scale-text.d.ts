declare module 'react-scale-text' {
    import * as React from 'react';
  
    interface ScaleTextProps {
      children?: React.ReactNode;
      maxFontSize?: number;
      minFontSize?: number;
      widthOnly?: boolean;
      className?: string;
      style?: React.CSSProperties;
      onResize?: () => void;
    }
  
    const ScaleText: React.FC<ScaleTextProps>;
  
    export default ScaleText;
  }