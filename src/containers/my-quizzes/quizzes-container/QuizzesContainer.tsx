import { Box } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react"
import AddResourceWithInput from "~/containers/my-resources/add-resource-with-input/AddResourceWithInput";
import MyResourcesTable from "~/containers/my-resources/my-resources-table/MyResourcesTable";
import useAxios from "~/hooks/use-axios";
import { ResourceService } from "~/services/resource-service";
import { CreateQuizParams, Quiz, ResourcesTableData, ResourcesTabsEnum } from "~/types"

const QuizzesContainer = () => {
    const [quizzes,setQuizzes] = useState<Quiz[]>([]);
    const [pagination,setPagination] = useState({
        page:1,
        itemsPerPage:10,
        count:0
    });

    const fetchQuizzes = useCallback(async () => {
        const response = await ResourceService.getQuizzes();
        setQuizzes(response.data.items);
        setPagination(prev => ({
            ...prev,
            count:response.data.count
        }));
        return response;
    },[]);

    useEffect(()=> {
        fetchQuizzes();

    },[fetchQuizzes]);

    const handleAddQuiz = async(quiz:CreateQuizParams) => {
        await ResourceService.addQuiz(quiz);
        fetchQuizzes();
    }
   const handleEdit = (id:string) => {

   }
   const handleDuplicate = (id:string) => {

   }
   const handlePageChange = (event:React.ChangeEvent<unknown>,page:number) => {
    setPagination(prev => ({
        ...prev,page
    }));
   }


    const {loading} = useAxios({
        service:fetchQuizzes,
        fetchOnMount:true,
        defaultResponse: {count:0,items:[]}
    });
const data: ResourcesTableData<Quiz> = {
    response:{
        items:quizzes,
        count:pagination.count
    },
    getData:async () => {
        await fetchQuizzes();
    }
};
const columns = [
    {id:'attachment',label:'Attachment Name'},
    {id:'category',label:'Category'},
    {id:'action',label:'action'},

]


    return (
        <Box>
          
            <MyResourcesTable 
            resource={ResourcesTabsEnum.Quiz} 
            itemsPerPage={pagination.itemsPerPage}
             data={data}
             actions={{
                onEdit:handleEdit,
                onDuplicate:handleDuplicate
             }}
             services={{deleteService:ResourceService.deleteQuiz}}
             pagination={{
                page:pagination.page,
                onChange:handlePageChange,
                count:pagination.count
             }}
             columns={columns}
  
            />
              <AddResourceWithInput onAddResource={handleAddQuiz}/>
        </Box>
    )
}
export default QuizzesContainer