package com.example.winwin.mapper.file;

import com.example.winwin.dto.file.ResumeFileDto;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ResumeFile {
    public void  insertResumeFile(ResumeFileDto resumeFileDto);
    public ResumeFileDto selectResumeFile(Long resumeNumber);
    public void deleteResumeFile(Long resumeNumber);
}
