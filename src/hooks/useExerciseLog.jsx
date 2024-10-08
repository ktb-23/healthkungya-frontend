// hooks/useExerciseLog.js
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addExItem, resetExItems } from '../provider/slices/exitem';
import useInsertExlog from '../api/useInsertExlog';
import useGetExlog from '../api/useGetExlog';
import useUpdateExlog from '../api/useUpdateExlog';

const useExerciseLog = (selectedDate) => {
  const dispatch = useDispatch();
  const exItem = useSelector((state) => state.exItem.exItem);
  const [logId, setLogId] = useState('');
  const [dateId, setDateId] = useState('');
  const [durations, setDurations] = useState({});

  const fetchExlog = async () => {
    try {
      const response = await useGetExlog(selectedDate);
      if (response.length > 0) {
        const logEntry = response[0];
        setDateId(logEntry.date_id);
        setLogId(logEntry.log_id);
        const exitemIds = logEntry.exitem_id
          .split(',')
          .map((id) => parseInt(id.trim()));
        const exercises = logEntry.ex.split(',').map((ex) => ex.trim());
        const extimes = logEntry.extime
          .split(',')
          .map((time) => parseInt(time.trim()));
        const mets = logEntry.met
          .split(',')
          .map((met) => parseFloat(met.trim()));

        const exerciseItems = exitemIds.map((exitem_id, index) => ({
          exitem_id,
          ex: exercises[index],
          extime: extimes[index],
          met: mets[index],
        }));
        dispatch(resetExItems()); // 상태 초기화
        exerciseItems.forEach((item) => dispatch(addExItem(item)));
      }
    } catch (error) {
      console.log(error);
      // 오류 발생 시 상태를 초기화
      dispatch(resetExItems());
      setLogId('');
      setDateId('');
      setDurations({});
    }
  };

  useEffect(() => {
    fetchExlog();
  }, [selectedDate]);

  const handleDurationChange = (exitem_id, duration) => {
    setDurations({ ...durations, [exitem_id]: parseInt(duration) });
  };

  const handleUploadClick = async () => {
    const exercises = exItem.map((item) => ({
      exitem_id: item.exitem_id,
      ex: item.ex,
      extime: durations[item.exitem_id] || item.extime,
      met: item.met,
    }));

    const uploadData = {
      date: selectedDate,
      exercises,
    };

    try {
      const response = await useInsertExlog(uploadData);
      if (response.message === '해당 날짜에 대한 기록이 이미 존재합니다.') {
        const response = await useUpdateExlog(uploadData, logId);
        alert(response.message);
        window.location.reload();
      } else {
        alert(response.message);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    handleDurationChange,
    handleUploadClick,
    durations,
    exItem,
    logId,
    dateId,
  };
};

export default useExerciseLog;
