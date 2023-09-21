import React, { useEffect, useRef, useState } from 'react'
import { ResponsivePie } from '@nivo/pie'
import { Box, CircularProgress } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Colors } from 'constants/colors';
import { getAllDonatorsList, getDonatorInformationCall } from 'utils/api';

const DonatorPieChart = () => {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [donatorSelection, setDonatorSelection] = useState('none');
    const [donatorList, setDonatorList] = useState([])

    const donatorSelectionRef = useRef('');

    const fetchData = async (usersDonatorSelection) => {
        try {
            
            const donatorInformationResponse = await getDonatorInformationCall(usersDonatorSelection);
            const donatorInformationResponseData = await donatorInformationResponse.json();
            console.log(donatorInformationResponseData)
            
            if (Array.isArray(donatorInformationResponseData)) {
                setData(donatorInformationResponseData);
                setIsLoading(false);
            } else {
                console.error('Data received is not an array:', donatorInformationResponseData);
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setIsLoading(false);
        }
    };
    
    const fetchUsersList = async () => {
        try{
            const donorsListResponse = await getAllDonatorsList();
            const donorsListResponseData = await donorsListResponse.json();
            setDonatorList(donorsListResponseData);
        }catch (error) {
            console.error('Error fetching data:', error);
            setIsLoading(false);
        }
    }

    useEffect( () => {
        fetchData();
        fetchUsersList();
    }, [] )

    useEffect( () => {
        fetchData(donatorSelection);
    }, [donatorSelection] )


  return (
 
    <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', m:"1.5rem 2.5rem" }}>
        <Box>
            <InputLabel id="CategorySelectorLabel">Category</InputLabel>
            <Select
                labelId="donationCategoryLabel"
                id="donationCategory"
                label="Category"
                inputRef={donatorSelectionRef}
                value={donatorSelection}
                onChange={(e) => setDonatorSelection(e.target.value)}
                error={!donatorSelection}
                helperText={!donatorSelection ? "Required" : ""}
            >
                <MenuItem value="none">
                    <em>None</em>
                </MenuItem>
                
                {donatorList.map((donator) => (
                    <MenuItem key={donator} value={donator}>
                    {donator}
                    </MenuItem>
                ))}
            </Select>
        </Box>

        {isLoading ? (
            <CircularProgress />
        ) : (
            <Box  
                mt='40px'
                height='75vh'
                width='80%'
                borderRadius='4px'
                borderColor={Colors.primary500}
                borderWidth='2px' 
                borderStyle='solid'
            >
                <ResponsivePie
                        data={data}
                        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                        innerRadius={0.5}
                        padAngle={0.7}
                        cornerRadius={3}
                        activeOuterRadiusOffset={8}
                        borderWidth={1}
                        borderColor={{
                            from: 'color',
                            modifiers: [
                                [
                                    'darker',
                                    0.2
                                ]
                            ]
                        }}
                        arcLinkLabelsSkipAngle={10}
                        arcLinkLabelsTextColor="#333333"
                        arcLinkLabelsThickness={2}
                        arcLinkLabelsColor={{ from: 'color' }}
                        arcLabelsSkipAngle={10}
                        arcLabelsTextColor={{
                            from: 'color',
                            modifiers: [
                                [
                                    'darker',
                                    2
                                ]
                            ]
                        }}
                        defs={[
                            {
                                id: 'dots',
                                type: 'patternDots',
                                background: 'inherit',
                                color: 'rgba(255, 255, 255, 0.3)',
                                size: 4,
                                padding: 1,
                                stagger: true
                            },
                            {
                                id: 'lines',
                                type: 'patternLines',
                                background: 'inherit',
                                color: 'rgba(255, 255, 255, 0.3)',
                                rotation: -45,
                                lineWidth: 6,
                                spacing: 10
                            }
                        ]}
                        fill={[
                            {
                                match: {
                                    id: 'ruby'
                                },
                                id: 'dots'
                            },
                            {
                                match: {
                                    id: 'c'
                                },
                                id: 'dots'
                            },
                            {
                                match: {
                                    id: 'go'
                                },
                                id: 'dots'
                            },
                            {
                                match: {
                                    id: 'python'
                                },
                                id: 'dots'
                            },
                            {
                                match: {
                                    id: 'scala'
                                },
                                id: 'lines'
                            },
                            {
                                match: {
                                    id: 'lisp'
                                },
                                id: 'lines'
                            },
                            {
                                match: {
                                    id: 'elixir'
                                },
                                id: 'lines'
                            },
                            {
                                match: {
                                    id: 'javascript'
                                },
                                id: 'lines'
                            }
                        ]}
                        legends={[
                            {
                                anchor: 'bottom',
                                direction: 'row',
                                justify: false,
                                translateX: 0,
                                translateY: 56,
                                itemsSpacing: 0,
                                itemWidth: 100,
                                itemHeight: 18,
                                itemTextColor: '#999',
                                itemDirection: 'left-to-right',
                                itemOpacity: 1,
                                symbolSize: 18,
                                symbolShape: 'circle',
                                effects: [
                                    {
                                        on: 'hover',
                                        style: {
                                            itemTextColor: '#000'
                                        }
                                    }
                                ]
                            }
                        ]}
                    />
            </Box>
        )}
    </Box>

  )
}

export default DonatorPieChart
