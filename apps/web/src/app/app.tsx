import { Button, Card } from '@nx-demo/shared/ui';
import { capitalize, formatDate } from '@nx-demo/shared/utils';

export function App() {
  const today = new Date();
  const name = 'john doe';

  return (
    <div className="app">
      <Card title="Welcome">
        <p>Today is {formatDate(today)}</p>
        <p>Hello, {capitalize(name)}!</p>
        <Button variant="primary" onClick={() => alert('Clicked!')}>
          Click me
        </Button>
      </Card>
    </div>
  );
}