import React, { useEffect, useState } from 'react';
import { getJwt } from 'utils/cookies';
import TopicAPI from 'utils/API/TopicsApi';
import Delete from 'components/AlertWindow/Delete';
import { isEmptyArray } from 'formik';
import TopicsCard from './components/TopicsCard';
import Loading from '../Loading';
import Container from '../Container';

const UserTopics = () => {
  const [loading, setLoading] = useState(false);
  const [userTopics, setUserTopics] = useState(null);
  const [isConfirmDelete, setIsConfirmDelete] = useState(false);
  const [currentTopic, setCurrentTopic] = useState({ id: null, name: null });

  const openConfirmDelete = (id, name) => {
    setIsConfirmDelete(true);
    setCurrentTopic({ id, name });
  };

  const handleClose = () => {
    setIsConfirmDelete(false);
  };

  const handleDelete = () => {
    TopicAPI.deleteTopic(currentTopic.id)
      .then(() => {
        setIsConfirmDelete(false);
        setCurrentTopic({ id: null, name: null });
        setUserTopics(userTopics.filter(topic => topic.id !== currentTopic.id));
      })
      .catch(err => console.log(err, 'err'));
  };

  useEffect(() => {
    setLoading(true);
    TopicAPI.getUserTopics(getJwt())
      .then(res => {
        setLoading(false);
        setUserTopics(res);
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  }, [setUserTopics]);

  return (
    <Container>
      {loading ? (
        <Loading/>
      ) : (
        <div>
          {!userTopics ? (
            <h2 className="mb-5">Ничего не найдено</h2>
          ) : userTopics.length != 0 ? (
            userTopics.map((item, key) => (
              <div className="mb-5" key={key}>
                <TopicsCard item={item} openConfirmDelete={openConfirmDelete} />
              </div>
            ))
          ) : (
            <h2 className="mb-5">Ничего не найдено</h2>
          )}
          {isConfirmDelete && (
            <Delete
              topicName={currentTopic.name}
              open={isConfirmDelete}
              handleClose={handleClose}
              handleDelete={handleDelete}
            />
          )}
        </div>
      )}
    </Container>
  );
};

export default UserTopics;
