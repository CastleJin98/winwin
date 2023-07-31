package com.example.winwin.mapper.like;

import com.example.winwin.vo.board.CommunityCommentUdVo;
import com.example.winwin.vo.board.CommunityGoodVo;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CommunityCommentUdMapper {
    public Long udFind(CommunityCommentUdVo communityCommentUdVo);
    public void goodInsert(CommunityCommentUdVo communityCommentUdVo);
    public void goodCancle(CommunityCommentUdVo communityCommentUdVo);
    public void hateInsert(CommunityCommentUdVo communityCommentUdVo);
    public void hateCancle(CommunityCommentUdVo communityCommentUdVo);
    public int udCnt(CommunityCommentUdVo communityCommentUdVo);

    //ud 삭제 (커뮤니티 게시글 삭제에서 사용)
    public void deleteForCommunity(Long communityNumber);

    //댓글 삭제시 (up&down 삭제)
    public void deleteCommentUd(Long commentNumber);

}
