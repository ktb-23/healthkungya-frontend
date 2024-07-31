import React from 'react';
import FixForm from './FixForm.jsx';
import Index from '../components/Index.jsx';
import Foodindex from '../picture/foodindex.svg';
import Exindex from '../picture/exindex.svg';
import Weightindex from '../picture/weightindex.svg';
import './styles/MainForm.scss';
import Button from '../components/Button.jsx';
const MainForm = () => {
  return (
    <>
      <FixForm />
      <div className="index-container">
        <Index indexicon={Foodindex} output="식단" />
        <Index indexicon={Exindex} output="운동" />
        <Index indexicon={Weightindex} output="체중" />
      </div>
      <div className="change">
        <Button variant={'foodchange'}>수정하기</Button>
        <Button variant={'exchange'}>수정하기</Button>
        <Button variant={'weightchange'}>수정하기</Button>
      </div>
    </>
  );
};

export default MainForm;
