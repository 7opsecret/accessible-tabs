import Tabs from './components/Tabs';
import './demo.css';

new Tabs(
    document.getElementById('tabs-1')
);

new Tabs(
    document.getElementById('tabs-2')
);

new Tabs(
    document.getElementById('vertical-tabs-1'),
    { orientation: 'vertical' }
);