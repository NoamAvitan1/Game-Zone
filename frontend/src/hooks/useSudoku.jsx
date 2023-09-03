import { useDispatch, useSelector } from 'react-redux'
import { getSudoku, getSudokuCount, setCurrentSudoku, setLevel, setPage } from '../redux/features/sudokuSlice';
import { apiDelete, apiPost, apiPut } from '../services/apiRequests';
import { Add_SUDOKU_TEMPLATE, DELETE_SUDOKU_TEMPLATE, UPDATE_SUDOKU_TEMPLATE } from '../constants/urls';

export default function useSudoku() {
    const {data,loading,error,currentSudoku,sudokuLevels ,page,pages,level } = useSelector(store => store.sudokuReducer);
    const dispatch  = useDispatch();

    const getSudokuTemolates = (payload) => {
        dispatch(getSudoku(payload ? payload : ""));
        getSudokuCounting(payload);
    }

    const getSudokuCounting = (payload) => {
        dispatch(getSudokuCount(payload ? payload : ""));
    }

    const setSudokuTemplate = (sudokuTemplate) => {
        dispatch(setCurrentSudoku(sudokuTemplate));
    }

    const addSudokuTemplate = async (sudoku) => {
        try {
            const response = await apiPost(Add_SUDOKU_TEMPLATE,sudoku);
            return response;
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    const updateSudokuTemplate = async (id,sudoku) => {
        try {
            const response = await apiPut(`${UPDATE_SUDOKU_TEMPLATE}${id}`,sudoku);
            if(response.status >= 200 && response.status < 300)
                selectPage(page);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    const deleteSudokuTemplate = async (id) => {
        try {
            const response = await apiDelete(`${DELETE_SUDOKU_TEMPLATE}${id}`);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }



    const selectPage = (selectedPage) => {
        dispatch(setPage(selectedPage));
        if (level) {
            getSudokuTemolates(`?page=${selectedPage}&level=${level}`);
        } else {
            getSudokuTemolates(`?page=${selectedPage}`);
        }
    }

    const selectLevel = (selectedLevel) => {
        setPage(1);
        if (selectedLevel) {
            getSudokuTemolates(`?level=${selectedLevel}`);
        } else {
            getSudokuTemolates();
            setLevel(null);
        }
    }
  return {
    data,
    loading,
    error,
    currentSudoku,
    sudokuLevels,
    page,
    pages,
    level,
    setSudokuTemplate,
    getSudokuTemolates,
    addSudokuTemplate,
    updateSudokuTemplate,
    deleteSudokuTemplate,
    selectPage,
    selectLevel
};
}
