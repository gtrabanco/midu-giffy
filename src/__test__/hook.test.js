import { act, renderHook  } from "@testing-library/react-hooks";
import { useSearchForm } from "hooks/useSearchForm";

test('should use initial values', () => {
  const keyword = 'matrix'
  const { result } = renderHook(() => useSearchForm({
    initialKeyword: keyword
  }))

  expect(result.current.keyword).toBe(keyword)
})

test('should update times', () => {
  const { result } = renderHook(() => useSearchForm())

  act(() => {
    result.current.updateKeyword('b')
    result.current.updateKeyword('ba')
  })

  expect(result.current.keyword).toBe('ba')
  expect(result.current.times).toBe(5)
})

test('should change keyword', () => {
  const keyword = 'batman'
  const { result } = renderHook(() => useSearchForm() );
  
  act(() => {
    result.current.updateKeyword(keyword);
  })

  expect(result.current.keyword)
    .toBe(keyword)
})
