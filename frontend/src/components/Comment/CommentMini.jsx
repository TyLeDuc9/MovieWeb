import React, { useState } from 'react';
import { IoSend } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { createComment, fetchReplies } from '../../redux/apiComment';

export const CommentMini = ({ parentId, movieId, onDone }) => {
  const dispatch = useDispatch();
  const [replyContent, setReplyContent] = useState('');
  const currentUser = useSelector((state) => state.auth.login.currentUser);
  const token = currentUser?.token;

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (!replyContent.trim()) return;

    await createComment({
      content: replyContent,
      tmdbMovieId: movieId,
      parentCommentId: parentId
    }, dispatch, token);

    await fetchReplies(parentId, dispatch);
    setReplyContent('');
    onDone(); 
  };

  return (
    <form onSubmit={handleReplySubmit} className="bg-[#2e3148] text-white p-2 mt-2 rounded-lg lg:w-[600px] w-[300px] sm:w-[400px]">
      <textarea
        value={replyContent}
        onChange={(e) => setReplyContent(e.target.value)}
        placeholder="Trả lời bình luận"
        maxLength={500}
        className="w-full bg-[#17181f] text-white p-2 rounded-md resize-none focus:outline-none text-xs lg:text-sm"
        rows={3}
      />
      <div className="flex items-center justify-end mt-2">
        <button
          type="submit"
          className="cursor-pointer flex items-center gap-1 text-yellow-400 hover:text-yellow-500 font-semibold text-xs lg:text-sm"
        >
          Gửi <IoSend />
        </button>
      </div>
    </form>
  );
};
