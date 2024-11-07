import classes from './ErrorInfo.module.css';

const ErrorInfo = (props: {title: string, children: any}) => {
  return (
    <div className={classes.wrapper}>
      <h1>{props.title}</h1>
      {props.children}
    </div>
  );
}

export default ErrorInfo;
