import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import Loading from './Loading';

const CreatePost = () => {
  const [loading, setLoading] = useState(false);
  const [{ title, image, body, author }, setFormState] = useState({
    title: '',
    image: '',
    body: '',
    author: 'Jorge Paul'
  });

  const navigate = useNavigate();

  const handleChange = e => setFormState(prev => ({ ...prev, [e.target.id]: e.target.value }));

  const handleSubmit = async e => {
    try {
      e.preventDefault();
      if (!title || !image || !body) throw new Error('Please fill out all the fields');
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BLOG_API}/posts`,
        {
          title,
          image,
          body,
          author
        },
        { headers: { Authorization: localStorage.getItem('token') } }
      );
      setLoading(false);
      navigate(`/posts/${data._id}`, { replace: true });
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data.error || error.message);
    }
  };

  if (loading) return <Loading />;
  return (
    <div className='row justify-content-center'>
      <div className='col-md-4'>
        <form className='form-signin' onSubmit={handleSubmit}>
          <label htmlFor='inputEmail' className='sr-only'>
            Title
          </label>
          <input
            id='title'
            className='form-control'
            placeholder='Title'
            value={title}
            onChange={handleChange}
          />
          <label htmlFor='inputPassword' className='sr-only'>
            Image
          </label>
          <input
            id='image'
            className='form-control'
            placeholder='Image URL'
            value={image}
            onChange={handleChange}
          />
          <label htmlFor='inputPassword' className='sr-only'>
            Image
          </label>
          <textarea
            id='body'
            className='form-control'
            placeholder='Body'
            value={body}
            onChange={handleChange}
          />
          <button className='btn btn-lg btn-primary btn-block mt-3' type='submit'>
            Create post
          </button>
          <p className='mt-5 mb-3 text-muted'>&copy; 2017-2018</p>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
