package com.example.winwin.service.board;

import com.example.winwin.dto.board.CommunityCommentDto;
import com.example.winwin.mapper.board.CommunityCommentMapper;
import com.example.winwin.mapper.like.CommunityCommentUdMapper;
import com.example.winwin.vo.board.CommunityCommentVo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class CommunityCommentService {
    private final CommunityCommentMapper communityCommentMapper;
    private final CommunityCommentUdMapper communityCommentUdMapper;

    public void register(CommunityCommentDto communityCommentDto){
        if (communityCommentDto == null) {
            throw new IllegalArgumentException("댓글 정보 누락");
        }
        communityCommentMapper.insert(communityCommentDto);
    }

    @Transactional(readOnly = true)
    public List<CommunityCommentVo> findList(Long communityNumber){
        if (communityNumber == null) {
            throw new IllegalArgumentException("댓글 번호 누락");
        }

        return communityCommentMapper.selectList(communityNumber);
    }

    @Transactional(readOnly = true)
    public CommunityCommentVo findComment(Long commentNumber){
        if (commentNumber == null) {
            throw new IllegalArgumentException("댓글 번호 누락");
        }
        return Optional.ofNullable(communityCommentMapper.select(commentNumber))
                .orElseThrow(()->{throw new IllegalArgumentException("존재하지 않는 댓글 번호");});
    }

    public void modify(CommunityCommentDto communityCommentDto){
        if (communityCommentDto == null) {
            throw new IllegalArgumentException("댓글 수정 정보 누락");
        }
        communityCommentMapper.update(communityCommentDto);
    }

    public void remove(Long commentNumber){
        if (commentNumber == null) {
            throw new IllegalArgumentException("댓글 번호 누락");
        }
        communityCommentMapper.delete(commentNumber);
    }


    public void deleteCommunity(Long communityNumber){
        if (communityNumber == null) {
            throw new IllegalArgumentException("게시글 번호 누락");
        }
        communityCommentMapper.deleteCommunity(communityNumber);
    }

    public List<CommunityCommentVo> findCommentUdList(CommunityCommentVo communityCommentVo) {
        if (communityCommentVo.getCommunityNumber() == null) {
            throw new IllegalArgumentException("글 번호 누락");
        }

        return communityCommentMapper.findCommentUdList(communityCommentVo);
    }

    public void deleteCommentUd(Long commentNumber){
        if (commentNumber == null) {
            throw new IllegalArgumentException("댓글 번호 누락");
        }
        communityCommentUdMapper.deleteCommentUd(commentNumber);
    }



}

