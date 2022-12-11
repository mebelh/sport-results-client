import Carousel from 'components/carousel';
import NavigationBar from 'components/navigationBar';
import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { rootStore } from 'dal/root-store';
import Typography from 'components/typography';
import { formatDateTimeToFull } from 'utils/parseDate';

const IMG_URL =
  'http://scalar.usc.edu/works/critical-internet-cat-studies/media/grumpycat_thumb.jpg';

const items = [
  <img src={IMG_URL} alt="" key="asd" />,
  <img
    src="https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png"
    alt=""
    key="asdasd"
  />,
  <img src={IMG_URL} alt="" key="asdxc" />,
  <img src={IMG_URL} alt="" key="asddwq1" />,
];

const ResultsPage: React.FC = () => {
  const {
    dalResultsStore,
    resultsStore: { init },
  } = rootStore;

  useEffect(init, []);

  return (
    <>
      <NavigationBar title={<Typography.Text3>Результаты</Typography.Text3>} />

      <Carousel items={items} />

      {dalResultsStore.results.map((result, index) => (
        <div key={result.id}>
          <Typography.Text4>
            {index + 1}) {formatDateTimeToFull(result.date)}
          </Typography.Text4>
          {result.approaches.map((approach) => (
            <div key={approach.id}>
              <div>{approach.exercise.name}</div>
              <div>Вес: {approach.weight}</div>
              <div>Повторений: {approach.repetitionsNumber}</div>
            </div>
          ))}
        </div>
      ))}
      {dalResultsStore.isLoading && (
        <Typography.Text4>Loading....</Typography.Text4>
      )}
    </>
  );
};

export default observer(ResultsPage);
