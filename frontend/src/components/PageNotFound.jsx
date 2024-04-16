import { Link } from 'react-router-dom';
const PageNotFound = () => {
  return (
    <>
      <p>Страница не найдена</p>
      <p>Но вы можете перейти на <Link to='/'>главную страницу</Link></p>
    </>
  )
};

export default PageNotFound;
