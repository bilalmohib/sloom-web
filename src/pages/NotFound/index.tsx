import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Page not found</h1>
      <p className="text-muted-foreground mt-2">
        The page you requested does not exist.
      </p>
      <Link
        to="/"
        className="text-primary mt-6 text-sm font-medium underline-offset-4 hover:underline"
      >
        Back to home
      </Link>
    </div>
  );
}
export default NotFound;