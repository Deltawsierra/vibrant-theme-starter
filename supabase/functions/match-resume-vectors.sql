
CREATE OR REPLACE FUNCTION match_resume_vectors(
  query_embedding vector,
  match_threshold float DEFAULT 0.5,
  match_count int DEFAULT 5
) RETURNS TABLE (
  id uuid,
  chunk_text text,
  metadata jsonb,
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    rv.id,
    rv.chunk_text,
    rv.metadata,
    1 - (rv.embedding <=> query_embedding) as similarity
  FROM
    resume_vectors rv
  WHERE
    1 - (rv.embedding <=> query_embedding) > match_threshold
  ORDER BY
    rv.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;
