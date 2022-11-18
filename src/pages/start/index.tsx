import React from 'react';
import { observer } from 'mobx-react-lite';
import { rootStore } from 'dal/root-store';
import Button from 'components/button';
import Typography from 'components/typography';
import { Link } from 'react-router-dom';
import { NavigationLinksWrapper } from './style';

const StartPage: React.FC = () => {
  const { userInfo } = rootStore.dalUserStore;

  return (
    <div>
      <Typography.Text3>
        Привет {userInfo?.firstName || userInfo?.login}
      </Typography.Text3>
      <NavigationLinksWrapper>
        <Link to="/training">
          <Button type="accent" text="Начать тренировку" />
        </Link>
        <Link to="/results">
          <Button type="primary" text="Результаты" />
        </Link>
        <Link to="/workouts">
          <Button type="primary" text="Тренировки" />
        </Link>
        <Link to="/exercises">
          <Button type="primary" text="Упражнения" />
        </Link>
        <Link to="/equipment">
          <Button type="primary" text="Реквизит" />
        </Link>
      </NavigationLinksWrapper>
    </div>
  );
};

export default observer(StartPage);
