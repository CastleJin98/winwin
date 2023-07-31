package com.example.winwin.mapper.board;

import com.example.winwin.dto.board.CommunityCommentDto;
import com.example.winwin.dto.board.CommunityDto;
import com.example.winwin.vo.board.CommunityCommentVo;
import com.example.winwin.vo.board.CommunityVo;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CommunityCommentMapper {
    public void insert(CommunityCommentDto communityCommentDto);
    public List<CommunityCommentVo> selectList(Long communityNumber);
    public CommunityCommentVo select(Long commentNumber);
    public void update(CommunityCommentDto communityCommentDto);
    public void delete(Long commentNumber);
    public void deleteCommunity(Long communityNumber);
    List<CommunityCommentVo> findCommentUdList(CommunityCommentVo communityCommentVo);
//    public String udCnt(Long userNumber, Long commentNumber);
}
