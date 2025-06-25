import { DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';

export const SWAGGER_CONFIG = new DocumentBuilder()
  .setTitle('Farmacia api')
  .setVersion('0.0.0')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'Authorization',
      in: 'header',
    },
    'access-token',
  )
  .build();

export const SWAGGER_CUSTOM_OPTIONS: SwaggerCustomOptions = {
  customSiteTitle: 'Farmacia api',
  swaggerOptions: {
    docExpansion: 'none',
    deepLinking: false,
    displayRequestDuration: true,
    defaultModelsExpandDepth: 0,
    tryItOutEnabled: true,
    showExtensions: true,
    persistAuthorization: true,
  },
  customCss: `
        body {
          background-color: #121212;
        }
        .swagger-ui .topbar {
          background-color: #1f1f1f;
          border-bottom: 0px;
        }
  
        .swagger-ui {
          color: #fff !important;
        }
  
        .swagger-ui .responses-inner h4,
        .swagger-ui .responses-inner h5 {
          color: #fff;
        }
  
        .swagger-ui .topbar-wrapper img {
          content: url('https://swagger.io/img/logo--white.png');
        }
        .swagger-ui a.nostyle,
        .swagger-ui a.nostyle:visited {
          color: #fff;
        }
        .swagger-ui .opblock .opblock-summary-description {
          color: #fff;
        }
        .swagger-ui .scheme-container {
          background-color: #121212;
        }
  
        .swagger-ui .info .title {
          color: #ffffff !important;
          border: 0px;
          padding: 15px;
          border-radius: 5px;
        }
  
        .swagger-ui .info h2.title,
        .swagger-ui .info h2.title span,
        .swagger-ui .info h2.title small,
        .swagger-ui .info h2.title pre {
          color: #ffffff !important;
        }
  
        .swagger-ui .opblock .opblock-section-header h4 {
          color: #ffffff;
        }
  
        .swagger-ui .response-col_status {
          color: #ffffff !important;
        }
  
        .swagger-ui .response-col_links {
          color: rgb(161, 161, 161) !important;
        }
  
        .swagger-ui .tab li button.tablinks {
          color: #ffffff;
        }
  
        .swagger-ui .model-toggle:after {
          background: url("data:image/svg+xml;charset=utf-8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path fill='%23fff' d='M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z'/></svg>")
            50% no-repeat;
          background-size: 100%;
          content: '';
          display: block;
          height: 20px;
          width: 20px;
        }
  
        .swagger-ui .model {
          color: #ffffff !important;
        }
  
        .swagger-ui .model-box-control:focus {
          outline: none;
        }
  
        .swagger-ui input[type='text'] {
          border: none;
        }
  
        .swagger-ui .btn.execute {
          background-color: #333 !important;
        }
  
        .swagger-ui .btn-group .btn:last-child {
          border-radius: 0 4px 4px 0;
          background-color: transparent !important;
          border: 2px solid #333;
        }
  
        .swagger-ui .parameter__name.required:after {
          color: rgb(253, 38, 38);
          content: 'required';
          font-size: 10px;
          padding: 5px;
          position: relative;
          top: -6px;
        }
  
        .swagger-ui .arrow path {
          fill: #ffffff !important;
        }
  
        .swagger-ui .opblock-tag {
          background-color: rgb(36, 35, 35);
          color: #ffffff;
          border-radius: 10px;
          padding-top: 10px;
          margin: 5px;
        }
  
        .opblock.opblock {
          border: 0px;
          border-radius: 10px;
          padding: 5px;
        }
  
        .swagger-ui .opblock .opblock-section-header {
          background-color: #1e1e1e;
          border-top-right-radius: 10px;
          border-top-left-radius: 10px;
        }
  
        .swagger-ui .opblock .tab-header .tab-item.active h4 span:after {
          bottom: -10px;
        }
  
        .swagger-ui table thead tr th {
          color: #ffffff;
        }
  
        .swagger-ui .opblock {
          margin: 10px 5px;
        }
  
        .swagger-ui .opblock-summary {
          border-bottom: 0px;
          color: #fff;
          border-radius: 10px;
          padding: 5px;
        }
        .swagger-ui .opblock-summary-method {
          color: #fff !important;
        }
        .swagger-ui .opblock.opblock .opblock-summary {
          border: none;
        }
        .swagger-ui .opblock-summary-control:focus {
          outline: none;
        }
        .swagger-ui .btn {
          background-color: #333 !important;
          color: #fff !important;
          border: 0px;
        }
        .swagger-ui .parameter__name,
        .swagger-ui .parameter__type,
        .swagger-ui .model-title,
        .swagger-ui .response-col_description {
          color: #ccc !important;
        }
        .swagger-ui select {
          background-color: #2c2c2c;
          color: #fff;
        }
        .swagger-ui .responses-inner {
          background-color: #2a2a2a;
        }
        .swagger-ui textarea,
        .swagger-ui input {
          background-color: #2a2a2a !important;
          color: #ffffff !important;
          border: 0px;
        }
        .swagger-ui .opblock-description-wrapper {
          background-color: #2c2c2c;
        }
  
        .opblock-section {
          background-color: #2c2c2c;
          color: #fff;
          border-radius: 10px;
        }
  
        .swagger-ui textarea,
        .swagger-ui input {
          background-color: #1e1e1e !important;
        }
        .swagger-ui .opblock .tab-header .tab-item.active h4 span {
          color: #fff;
        }
        .swagger-ui .opblock-description-wrapper p {
          color: #fff;
        }
        .swagger-ui .tab,
        .swagger-ui .tabs li {
          background-color: #2c2c2c !important;
          color: #fff !important;
        }
  
      `,
};
