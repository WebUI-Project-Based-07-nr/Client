import { render,screen} from "@testing-library/react";
import { UserEvent } from "@testing-library/user-event";
import { beforeEach, describe,test } from "vitest";
import SearchInput from "~/components/search-input/SearchInput";
describe('SearchInput component',()=> {
    let setSearch;

    beforeEach(() => {
        setSearch = vi.fn();
    });

    test('should render text correctly',()=>{
        render(<SearchInput search="test" setSearch={setSearch}/>);
        expect(screen.getByDisplayValue('test')).toBeInTheDocument();
    });

    test('should call setSearch when the search icon is clicked',()=>{
        render(<SearchInput search="" setSearch={setSearch} />);
    })
})