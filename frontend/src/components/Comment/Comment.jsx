import { useParams } from 'react-router-dom';
import {
  fetchCommentsByMovie,
  createComment,
  deleteComment,
  fetchReplies,

} from '../../redux/apiComment';
import React, { useEffect, useState } from 'react'
import { Title } from '../Title/Title'
import { useDispatch, useSelector } from 'react-redux';
import { FaCommentAlt, FaReply } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';
import { IoSend } from 'react-icons/io5';
import { CommentMini } from './CommentMini';
export const Comment = ({ className = '' }) => {
  const { id } = useParams()   //lay id tu params
  const tmdbMovieId = parseInt(id);  // lay id tu phim ep kieu
  const dispatch = useDispatch()   // gui action den store thay doi state
  const currentUser = useSelector((state) => state.auth.login.currentUser) // lay thong user hien tai dang dang nhap
  const token = currentUser?.token; // lay token cua user
  const userId = currentUser?.user?.id || currentUser?.user?._id;  // lay id cua user
  const replies = useSelector((state) => state.comment.replies);  // lay du lieu tu redux store
  const [content, setContent] = useState('');
  const { comments, loading } = useSelector((state) => state.comment);

  const [showDeleteCommentId, setShowDeleteCommentId] = useState(null);
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [openReplies, setOpenReplies] = useState({});


  useEffect(() => {
    if (tmdbMovieId) {
      fetchCommentsByMovie(tmdbMovieId, dispatch);
    }
  }, [tmdbMovieId, dispatch]);

  useEffect(() => {
    if (comments.length > 0) {
      comments.forEach((comment) => {
        if (!replies[comment._id]) {
          fetchReplies(comment._id, dispatch);
        }
      });
    }
  }, [comments, replies, dispatch]);

  const handleToggleReply = (commentId) => {
    setActiveReplyId(prev => (prev === commentId ? null : commentId));
    fetchReplies(commentId, dispatch);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    await createComment({
      content,
      tmdbMovieId: tmdbMovieId,
      parentCommentId: null
    }, dispatch, token);
    fetchCommentsByMovie(tmdbMovieId, dispatch);
    setContent('');
  };

  const handleShowDelete = (commentId) => {
    setShowDeleteCommentId(prevId => (prevId === commentId ? null : commentId));
  };

  const handleDelete = async (commentId) => {
    if (!window.confirm('Bạn chắc chắn muốn xoá comment này?')) return;
    await deleteComment(commentId, dispatch, token);
  };

  const [avatar, setAvatar] = useState(
    localStorage.getItem(`avatar_user_${userId}`) ||
    'https://i.pinimg.com/1200x/14/dc/03/14dc031c7e4c67728100119f24208deb.jpg'
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const newAvatar = localStorage.getItem(`avatar_user_${userId}`);
      if (newAvatar && newAvatar !== avatar) {
        setAvatar(newAvatar);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [userId, avatar]);

  const toggleReplies = (commentId) => {
    setOpenReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
    if (!replies[commentId]) {
      fetchReplies(commentId, dispatch);
    }
  };
  return (
    <div className={`${className}`}>
      <div className='flex items-center'>
        <FaCommentAlt className='text-white' size={20} />
        <Title title='Bình luận' className='text-white font-bold lg:text-2xl text-sm lg:px-2 px-1' />
      </div>

      <div className="flex items-start gap-3 p-2">
        <img
          src={avatar}
          alt="avatar"
          className="lg:h-[50px] lg:w-[50px] h-[40px] w-[40p  x] rounded-full object-cover 
          shadow-md border-2 border-white mt-1 hover:opacity-85"
        />
        <div className='flex-col mt-2'>
          <p className='text-gray-400 lg:text-sm text-xs'>Bình luận với tên</p>
          <p className="font-bold text-white lg:text-sm text-xs">{currentUser?.user?.name || 'Ẩn danh'}</p>

        </div>
      </div>
      {currentUser ? (
        <form onSubmit={handleSubmit} className="bg-[#2e3148] text-white p-2 mt-4 rounded-lg w-full">
          <div className="relative">

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Viết bình luận"
              maxLength={500}
              className="w-full bg-[#17181f] text-white p-2 rounded-md resize-none focus:outline-none text-xs lg:text-sm"
              rows={4}
            />
            <span className="absolute top-1 right-2 text-xs text-gray-400 ">
              {content.length}/500
            </span>
          </div>

          <div className="flex items-center justify-end mt-3">
            <button
              type="submit"
              className="cursor-pointer flex items-center gap-1 text-yellow-400 hover:text-yellow-500 font-semibold text-xs lg:text-sm"
            >
              Gửi <IoSend />
            </button>
          </div>
        </form>

      ) : (
        <p className="text-gray-500 px-2 py-2 text-sm">Vui lòng đăng nhập để bình luận.</p>
      )}

      {loading ? (
        <p>Đang tải bình luận...</p>
      ) : (
        comments.map((comment) => (
          <div
            key={comment._id}
            className="pt-2 mt-2 flex justify-between items-start"
          >
            <div className="flex items-start gap-2 p-1">
              <img
                src={
                  localStorage.getItem(`avatar_user_${comment.userId?._id}`) ||
                  'https://i.pinimg.com/1200x/14/dc/03/14dc031c7e4c67728100119f24208deb.jpg'
                }
                alt="avatar"
                className="lg:h-[50px] lg:w-[50px] w-[40px] h-[40px] rounded-full object-cover 
    shadow-md border-2 border-white mt-1 hover:opacity-85"
              />
              <div className="flex flex-col">
                <p className="font-bold text-amber-300 text-xs">{comment.userId?.name}</p>
                <p className='lg:text-sm text-gray-300 py-1 text-xs'>{comment.content}</p>
                <div className='flex items-center my-1'>
                  <button
                    onClick={() => handleToggleReply(comment._id)}
                    className='text-white flex text-xs items-center'>
                    <FaReply className='mb-0.5 cursor-pointer' />
                    <span className='text-white px-1 cursor-pointer text-xs'> Trả lời</span>
                  </button>

                  {currentUser &&
                    (currentUser.user?.id || currentUser.user?._id)?.toString() === comment.userId?._id?.toString() && (
                      <button className="text-white relative">
                        <BsThreeDots
                          size={20}
                          onClick={() => handleShowDelete(comment._id)}
                          className="cursor-pointer"
                        />

                        {showDeleteCommentId === comment._id && (
                          <button
                            onClick={() => handleDelete(comment._id)}
                            className="absolute top-6 left-0 bg-white text-red-500 text-sm px-2 py-1 rounded shadow z-10"
                          >
                            Xoá
                          </button>
                        )}
                      </button>
                    )}

                </div>
                <p className="text-xs text-gray-500">
                  {new Date(comment.createdAt).toLocaleString()}
                </p>

                {activeReplyId === comment._id && (
                  <CommentMini
                    parentId={comment._id}
                    movieId={tmdbMovieId}
                    onDone={() => setActiveReplyId(null)}
                  />
                )}

                {replies[comment._id]?.length > 0 && (
                  <div>
                    {!openReplies[comment._id] ? (
                      <button
                        onClick={() => toggleReplies(comment._id)}
                        className="lg:text-sm text-xs text-amber-200 hover:underline ml-6 cursor-pointer"
                      >
                        Xem {replies[comment._id].length} phản hồi
                      </button>
                    ) : (
                      <>
                        <div className="ml-6 mt-2 space-y-2">
                          {replies[comment._id].map((reply) => (
                            <div key={reply._id} className="flex items-start gap-3">
                              <img
                                src={
                                  localStorage.getItem(`avatar_user_${reply.userId?._id}`) ||
                                  'https://i.pinimg.com/1200x/14/dc/03/14dc031c7e4c67728100119f24208deb.jpg'
                                }
                                alt="avatar"
                                className="lg:h-[40px] lg:w-[40px] h-[40px] w-[40px] rounded-full object-cover border-2 border-white"
                              />
                              <div>
                                <p className="font-semibold text-amber-300 lg:text-sm text-xs">{reply.userId?.name}</p>
                                <p className="text-gray-300 lg:text-sm text-xs" >{reply.content}</p>
                                <p className="text-xs text-gray-500">{new Date(reply.createdAt).toLocaleString()}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <button
                          onClick={() => toggleReplies(comment._id)}
                          className="lg:text-sm text-amber-200 hover:underline cursor-pointer ml-6 mt-2 text-xs"
                        >
                          Ẩn phản hồi
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div >
  )
}
