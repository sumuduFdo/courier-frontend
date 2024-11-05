import classes from './ErrorContent.module.css';

function ErrorContent(props: {title: string, children: any}) {
  return (
    <div className={classes.wrapper}>
      <h1>{props.title}</h1>
      {props.children}
    </div>
  );
}

export default ErrorContent;
