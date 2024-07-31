import React from 'react';
import FixForm from './FixForm.jsx';
import Index from '../components/Index.jsx';
import Foodindex from '../picture/foodindex.svg';
import Exindex from '../picture/exindex.svg';
import Weightindex from '../picture/weightindex.svg';
import './styles/MainForm.scss';
import Button from '../components/Button.jsx';
import Output from '../components/Output.jsx';

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
      <div className="mainoutput-container">
        <Output text="식단-아침">아침</Output>
        <Output text="식단-점심">점심</Output>
        <Output text="식단-저녁">저녁</Output>
        <Output text="운동">운동</Output>
        <Output text="운동소모">소모칼로리</Output>
        <Output text="체중">체중</Output>
      </div>
    </>
  );
};

export default MainForm;
