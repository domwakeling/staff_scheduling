import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const TransferRow = ({text, uploadHandler, downloadHandler, inputId, disabled}) => {

    const textColor = disabled ? 'rgba(0, 0, 0, .26)' : '#000';

    const theme = useTheme(); 
    const showText = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <Box sx={{ pb: 1, display: 'flex', alignItems: 'center' }}>
            <Typography sx={{flex: 1, color: textColor }}>
                {text}
            </Typography> 
            <Button
                variant="contained"
                sx={{ minWidth: {xs: '0px', md: '140px'}, ml: 1}}
                onClick={downloadHandler}
                disabled={disabled}
            >
                <FileDownloadIcon sx={{ ml: { xs: 0, md: -1 }, mr: { xs: 0, md: 1 } }} />
                {showText && 'Download'}
            </Button>
            <input
                type="file"
                accept=".csv"
                style={{ display: 'none' }}
                id={inputId}
                onChange={uploadHandler}
            />
            <label htmlFor={inputId}>
                <Button
                    variant="contained"
                    sx={{ minWidth: { xs: '0px', md: '140px' }, ml: 1 }}
                    disabled={disabled}
                    component="span"
                >
                    <FileUploadIcon sx={{ ml: { xs: 0, md: -1 }, mr: { xs: 0, md: 1 } }} />
                    {showText && 'Upload'}
                </Button>
            </label>
        </Box>
    )
}

export default TransferRow;