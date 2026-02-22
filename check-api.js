// 检查 API 端点是否可访问
const https = require('https');

function checkApiEndpoint() {
    const apiUrl = 'https://p.2x.nz/api/ide/v1/text_to_image?prompt=test&image_size=square';
    
    console.log('检查 API 端点:', apiUrl);
    
    https.get(apiUrl, (res) => {
        console.log('状态码:', res.statusCode);
        console.log('响应头:', res.headers);
        
        if (res.statusCode === 200) {
            console.log('✅ API 端点可访问');
        } else {
            console.log('❌ API 端点返回错误状态码:', res.statusCode);
        }
        
    }).on('error', (err) => {
        console.log('❌ API 端点访问失败:', err.message);
    });
}

// 检查主域名是否可访问
function checkDomain() {
    const domainUrl = 'https://p.2x.nz';
    
    console.log('检查主域名:', domainUrl);
    
    https.get(domainUrl, (res) => {
        console.log('状态码:', res.statusCode);
        if (res.statusCode === 200) {
            console.log('✅ 主域名可访问');
        } else {
            console.log('❌ 主域名返回错误状态码:', res.statusCode);
        }
    }).on('error', (err) => {
        console.log('❌ 主域名访问失败:', err.message);
    });
}

// 运行检查
checkDomain();
checkApiEndpoint();