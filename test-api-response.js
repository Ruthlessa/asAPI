// 测试 API 响应的简单脚本
const https = require('https');

// 测试不同的 API 端点
const testEndpoints = [
    'https://p.2x.nz/api/ide/v1/text_to_image?prompt=test&image_size=square',
    'https://p.2x.nz/',
    'https://via.placeholder.com/100',
    'https://placekitten.com/100/100'
];

// 测试单个端点
function testEndpoint(url) {
    console.log(`\n测试: ${url}`);
    
    https.get(url, (res) => {
        console.log(`状态码: ${res.statusCode}`);
        console.log(`内容类型: ${res.headers['content-type']}`);
        
        if (res.statusCode === 200) {
            console.log('✅ 成功');
        } else {
            console.log('❌ 失败');
        }
        
    }).on('error', (err) => {
        console.log(`❌ 错误: ${err.message}`);
    });
}

// 测试所有端点
testEndpoints.forEach(testEndpoint);