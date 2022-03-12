import styled from 'styled-components';
import Colour from '../../lib/color.js';
import Card from '../components/card';
import TextContent from '../textContent';

const Home = () => {
  const Dashboard = styled.div``;
  return (
    <div>
      <Dashboard>
        <TextContent></TextContent>
        <TextContent></TextContent>
        <Card>
          <TextContent></TextContent>
          <TextContent></TextContent>
          <TextContent></TextContent>
          <TextContent></TextContent>
        </Card>
      </Dashboard>
    </div>
  );
};

export default Home;
