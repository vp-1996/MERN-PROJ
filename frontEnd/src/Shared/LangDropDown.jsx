import React from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';


const LangDropDown = () => { 
  return (
    <>
     <Box sx={{ minWidth: 120 }}>
      <FormControl>
        {/* <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Age
        </InputLabel> */}
        <NativeSelect
        //    defaultValue={30}
          inputProps={{
            name: 'age',
            id: 'uncontrolled-native',
          }} 
        >
          <option>
            <ul>
           <li><img src='images/spain.png'/></li>
            </ul>
           
          </option>
          <option value={20}>
          <img src='images/spain.png'/>
            </option>
          <option value={30}>Thirty</option>
        </NativeSelect>
      </FormControl>
    </Box>
    
    
    </>
  )
}

export default LangDropDown