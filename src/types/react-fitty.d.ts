declare module 'react-fitty' {
    import * as React from 'react';
  
    interface FittyProps {
      children?: React.ReactNode;
      minSize?: number;
      maxSize?: number;
      wrapText?: boolean;
      observeMutations?: boolean;
      initialSize?: number;
    }
  
    export class ReactFitty extends React.Component<FittyProps> {}
    export default ReactFitty;
  }