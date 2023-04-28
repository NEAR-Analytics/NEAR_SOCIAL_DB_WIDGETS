State.init({
  code: null,
  codeIsFetched: false,
});

if (!state.codeIsFetched) {
  asyncFetch(
    "https://ipfs.io/ipfs/QmRQSP6FJHHyeQFDyspn4h9B9iszm2WMHYNZqwaVENguQ5?filename=NEARHorizonTCsv1.1Final.html"
  ).then((res) => {
    State.update({ code: res.body, codeIsFetched: true });
  });
  return <>Loading...</>;
}

return <iframe style={{ width: "100%", height: "80vh" }} srcDoc={state.code} />;
const Container = styled.div`
      ul.lst-kix_dwt0m1b2bi36-3 {
        list-style-type: none;
      }
      .lst-kix_98j484k3i4xg-3 > li:before {
        content: "\0025cf  ";
      }
      ul.lst-kix_dwt0m1b2bi36-2 {
        list-style-type: none;
      }
      ul.lst-kix_dwt0m1b2bi36-1 {
        list-style-type: none;
      }
      ul.lst-kix_dwt0m1b2bi36-0 {
        list-style-type: none;
      }
      ul.lst-kix_98j484k3i4xg-0 {
        list-style-type: none;
      }
      ul.lst-kix_98j484k3i4xg-1 {
        list-style-type: none;
      }
      .lst-kix_98j484k3i4xg-0 > li:before {
        content: "\0025cf  ";
      }
      .lst-kix_98j484k3i4xg-4 > li:before {
        content: "\0025cb  ";
      }
      ul.lst-kix_98j484k3i4xg-4 {
        list-style-type: none;
      }
      .lst-kix_3f81jyz4wf1-8 > li:before {
        content: " ";
      }
      ul.lst-kix_98j484k3i4xg-5 {
        list-style-type: none;
      }
      ul.lst-kix_98j484k3i4xg-2 {
        list-style-type: none;
      }
      .lst-kix_3f81jyz4wf1-4 > li {
        counter-increment: lst-ctn-kix_3f81jyz4wf1-4;
      }
      .lst-kix_3f81jyz4wf1-7 > li:before {
        content: " ";
      }
      ul.lst-kix_98j484k3i4xg-3 {
        list-style-type: none;
      }
      .lst-kix_98j484k3i4xg-1 > li:before {
        content: "\0025cb  ";
      }
      ul.lst-kix_98j484k3i4xg-8 {
        list-style-type: none;
      }
      .lst-kix_3f81jyz4wf1-6 > li:before {
        content: " ";
      }
      .lst-kix_98j484k3i4xg-2 > li:before {
        content: "\0025a0  ";
      }
      ul.lst-kix_98j484k3i4xg-6 {
        list-style-type: none;
      }
      ul.lst-kix_98j484k3i4xg-7 {
        list-style-type: none;
      }
      .lst-kix_3f81jyz4wf1-4 > li:before {
        content: "" counter(lst-ctn-kix_3f81jyz4wf1-2, decimal) "."
          counter(lst-ctn-kix_3f81jyz4wf1-3, decimal) "."
          counter(lst-ctn-kix_3f81jyz4wf1-4, decimal) " ";
      }
      .lst-kix_3f81jyz4wf1-3 > li:before {
        content: "" counter(lst-ctn-kix_3f81jyz4wf1-2, decimal) "."
          counter(lst-ctn-kix_3f81jyz4wf1-3, decimal) " ";
      }
      .lst-kix_3f81jyz4wf1-5 > li:before {
        content: "" counter(lst-ctn-kix_3f81jyz4wf1-5, lower-latin) ") ";
      }
      .lst-kix_3f81jyz4wf1-1 > li:before {
        content: "" counter(lst-ctn-kix_3f81jyz4wf1-1, upper-latin) ". ";
      }
      ul.lst-kix_dwt0m1b2bi36-8 {
        list-style-type: none;
      }
      ul.lst-kix_dwt0m1b2bi36-7 {
        list-style-type: none;
      }
      .lst-kix_3f81jyz4wf1-2 > li:before {
        content: "" counter(lst-ctn-kix_3f81jyz4wf1-2, decimal) ". ";
      }
      ul.lst-kix_dwt0m1b2bi36-6 {
        list-style-type: none;
      }
      ul.lst-kix_dwt0m1b2bi36-5 {
        list-style-type: none;
      }
      ul.lst-kix_dwt0m1b2bi36-4 {
        list-style-type: none;
      }
      ol.lst-kix_3f81jyz4wf1-2.start {
        counter-reset: lst-ctn-kix_3f81jyz4wf1-2 0;
      }
      ul.lst-kix_y28xcqo5rqg5-3 {
        list-style-type: none;
      }
      ul.lst-kix_y28xcqo5rqg5-4 {
        list-style-type: none;
      }
      .lst-kix_3f81jyz4wf1-0 > li:before {
        content: "" counter(lst-ctn-kix_3f81jyz4wf1-0, upper-roman) ". ";
      }
      ul.lst-kix_y28xcqo5rqg5-5 {
        list-style-type: none;
      }
      ul.lst-kix_y28xcqo5rqg5-6 {
        list-style-type: none;
      }
      ul.lst-kix_y28xcqo5rqg5-0 {
        list-style-type: none;
      }
      ul.lst-kix_y28xcqo5rqg5-1 {
        list-style-type: none;
      }
      ul.lst-kix_y28xcqo5rqg5-2 {
        list-style-type: none;
      }
      .lst-kix_y28xcqo5rqg5-1 > li:before {
        content: "\0025cb  ";
      }
      ol.lst-kix_3f81jyz4wf1-5.start {
        counter-reset: lst-ctn-kix_3f81jyz4wf1-5 0;
      }
      .lst-kix_y28xcqo5rqg5-0 > li:before {
        content: "\0025cf  ";
      }
      .lst-kix_y28xcqo5rqg5-2 > li:before {
        content: "\0025a0  ";
      }
      .lst-kix_3f81jyz4wf1-5 > li {
        counter-increment: lst-ctn-kix_3f81jyz4wf1-5;
      }
      .lst-kix_98j484k3i4xg-8 > li:before {
        content: "\0025a0  ";
      }
      .lst-kix_98j484k3i4xg-7 > li:before {
        content: "\0025cb  ";
      }
      .lst-kix_98j484k3i4xg-5 > li:before {
        content: "\0025a0  ";
      }
      .lst-kix_98j484k3i4xg-6 > li:before {
        content: "\0025cf  ";
      }
      .lst-kix_y28xcqo5rqg5-8 > li:before {
        content: "\0025a0  ";
      }
      ul.lst-kix_2re47yu2lmby-8 {
        list-style-type: none;
      }
      ul.lst-kix_2re47yu2lmby-7 {
        list-style-type: none;
      }
      ul.lst-kix_2re47yu2lmby-6 {
        list-style-type: none;
      }
      ul.lst-kix_2re47yu2lmby-5 {
        list-style-type: none;
      }
      ul.lst-kix_2re47yu2lmby-4 {
        list-style-type: none;
      }
      ul.lst-kix_2re47yu2lmby-3 {
        list-style-type: none;
      }
      .lst-kix_y28xcqo5rqg5-5 > li:before {
        content: "\0025a0  ";
      }
      ul.lst-kix_2re47yu2lmby-2 {
        list-style-type: none;
      }
      ul.lst-kix_tfu7uosz833n-8 {
        list-style-type: none;
      }
      ul.lst-kix_2re47yu2lmby-1 {
        list-style-type: none;
      }
      .lst-kix_3f81jyz4wf1-7 > li {
        counter-increment: lst-ctn-kix_3f81jyz4wf1-7;
      }
      ul.lst-kix_adj092ewufaz-7 {
        list-style-type: none;
      }
      .lst-kix_y28xcqo5rqg5-4 > li:before {
        content: "\0025cb  ";
      }
      ul.lst-kix_2re47yu2lmby-0 {
        list-style-type: none;
      }
      ul.lst-kix_tfu7uosz833n-6 {
        list-style-type: none;
      }
      ul.lst-kix_adj092ewufaz-8 {
        list-style-type: none;
      }
      ul.lst-kix_tfu7uosz833n-7 {
        list-style-type: none;
      }
      ul.lst-kix_adj092ewufaz-5 {
        list-style-type: none;
      }
      .lst-kix_y28xcqo5rqg5-3 > li:before {
        content: "\0025cf  ";
      }
      ul.lst-kix_adj092ewufaz-6 {
        list-style-type: none;
      }
      ul.lst-kix_adj092ewufaz-3 {
        list-style-type: none;
      }
      ul.lst-kix_adj092ewufaz-4 {
        list-style-type: none;
      }
      ul.lst-kix_tfu7uosz833n-0 {
        list-style-type: none;
      }
      ul.lst-kix_tfu7uosz833n-1 {
        list-style-type: none;
      }
      ul.lst-kix_tfu7uosz833n-4 {
        list-style-type: none;
      }
      .lst-kix_2re47yu2lmby-7 > li:before {
        content: "\0025cb  ";
      }
      .lst-kix_2re47yu2lmby-8 > li:before {
        content: "\0025a0  ";
      }
      ul.lst-kix_tfu7uosz833n-5 {
        list-style-type: none;
      }
      ul.lst-kix_tfu7uosz833n-2 {
        list-style-type: none;
      }
      ul.lst-kix_tfu7uosz833n-3 {
        list-style-type: none;
      }
      .lst-kix_2re47yu2lmby-5 > li:before {
        content: "\0025a0  ";
      }
      .lst-kix_2re47yu2lmby-6 > li:before {
        content: "\0025cf  ";
      }
      .lst-kix_y28xcqo5rqg5-6 > li:before {
        content: "\0025cf  ";
      }
      .lst-kix_y28xcqo5rqg5-7 > li:before {
        content: "\0025cb  ";
      }
      .lst-kix_2re47yu2lmby-2 > li:before {
        content: "\0025a0  ";
      }
      .lst-kix_2re47yu2lmby-1 > li:before {
        content: "\0025cb  ";
      }
      .lst-kix_2re47yu2lmby-3 > li:before {
        content: "\0025cf  ";
      }
      .lst-kix_2re47yu2lmby-0 > li:before {
        content: "\0025cf  ";
      }
      .lst-kix_2re47yu2lmby-4 > li:before {
        content: "\0025cb  ";
      }
      ol.lst-kix_3f81jyz4wf1-4.start {
        counter-reset: lst-ctn-kix_3f81jyz4wf1-4 0;
      }
      ul.lst-kix_adj092ewufaz-1 {
        list-style-type: none;
      }
      ul.lst-kix_adj092ewufaz-2 {
        list-style-type: none;
      }
      ul.lst-kix_adj092ewufaz-0 {
        list-style-type: none;
      }
      .lst-kix_3f81jyz4wf1-1 > li {
        counter-increment: lst-ctn-kix_3f81jyz4wf1-1;
      }
      ol.lst-kix_3f81jyz4wf1-3.start {
        counter-reset: lst-ctn-kix_3f81jyz4wf1-3 0;
      }
      .lst-kix_tfu7uosz833n-4 > li:before {
        content: "\0025cb  ";
      }
      .lst-kix_adj092ewufaz-8 > li:before {
        content: "\0025a0  ";
      }
      .lst-kix_tfu7uosz833n-2 > li:before {
        content: "\0025a0  ";
      }
      .lst-kix_tfu7uosz833n-3 > li:before {
        content: "\0025cf  ";
      }
      .lst-kix_bkzflgrrbamu-0 > li:before {
        content: "\0025cf  ";
      }
      .lst-kix_tfu7uosz833n-0 > li:before {
        content: "\0025cf  ";
      }
      .lst-kix_tfu7uosz833n-1 > li:before {
        content: "\0025cb  ";
      }
      ol.lst-kix_3f81jyz4wf1-6.start {
        counter-reset: lst-ctn-kix_3f81jyz4wf1-6 0;
      }
      .lst-kix_adj092ewufaz-2 > li:before {
        content: "\0025a0  ";
      }
      ol.lst-kix_3f81jyz4wf1-2 {
        list-style-type: none;
      }
      ol.lst-kix_3f81jyz4wf1-3 {
        list-style-type: none;
      }
      .lst-kix_adj092ewufaz-1 > li:before {
        content: "\0025cb  ";
      }
      .lst-kix_adj092ewufaz-3 > li:before {
        content: "\0025cf  ";
      }
      .lst-kix_3f81jyz4wf1-0 > li {
        counter-increment: lst-ctn-kix_3f81jyz4wf1-0;
      }
      ol.lst-kix_3f81jyz4wf1-4 {
        list-style-type: none;
      }
      .lst-kix_bkzflgrrbamu-3 > li:before {
        content: "\0025cf  ";
      }
      .lst-kix_bkzflgrrbamu-5 > li:before {
        content: "\0025a0  ";
      }
      ol.lst-kix_3f81jyz4wf1-5 {
        list-style-type: none;
      }
      .lst-kix_adj092ewufaz-0 > li:before {
        content: "\0025cf  ";
      }
      .lst-kix_adj092ewufaz-4 > li:before {
        content: "\0025cb  ";
      }
      ol.lst-kix_3f81jyz4wf1-0 {
        list-style-type: none;
      }
      .lst-kix_bkzflgrrbamu-4 > li:before {
        content: "\0025cb  ";
      }
      ol.lst-kix_3f81jyz4wf1-1 {
        list-style-type: none;
      }
      .lst-kix_adj092ewufaz-6 > li:before {
        content: "\0025cf  ";
      }
      .lst-kix_adj092ewufaz-5 > li:before {
        content: "\0025a0  ";
      }
      .lst-kix_adj092ewufaz-7 > li:before {
        content: "\0025cb  ";
      }
      .lst-kix_bkzflgrrbamu-1 > li:before {
        content: "\0025cb  ";
      }
      .lst-kix_bkzflgrrbamu-2 > li:before {
        content: "\0025a0  ";
      }
      .lst-kix_tfu7uosz833n-5 > li:before {
        content: "\0025a0  ";
      }
      .lst-kix_tfu7uosz833n-6 > li:before {
        content: "\0025cf  ";
      }
      .lst-kix_tfu7uosz833n-7 > li:before {
        content: "\0025cb  ";
      }
      .lst-kix_bkzflgrrbamu-8 > li:before {
        content: "\0025a0  ";
      }
      .lst-kix_tfu7uosz833n-8 > li:before {
        content: "\0025a0  ";
      }
      .lst-kix_bkzflgrrbamu-7 > li:before {
        content: "\0025cb  ";
      }
      .lst-kix_3f81jyz4wf1-8 > li {
        counter-increment: lst-ctn-kix_3f81jyz4wf1-8;
      }
      .lst-kix_bkzflgrrbamu-6 > li:before {
        content: "\0025cf  ";
      }
      ol.lst-kix_3f81jyz4wf1-8.start {
        counter-reset: lst-ctn-kix_3f81jyz4wf1-8 0;
      }
      ol.lst-kix_3f81jyz4wf1-1.start {
        counter-reset: lst-ctn-kix_3f81jyz4wf1-1 0;
      }
      .lst-kix_3f81jyz4wf1-2 > li {
        counter-increment: lst-ctn-kix_3f81jyz4wf1-2;
      }
      .lst-kix_dwt0m1b2bi36-3 > li:before {
        content: "\0025cf  ";
      }
      .lst-kix_dwt0m1b2bi36-4 > li:before {
        content: "\0025cb  ";
      }
      ul.lst-kix_y28xcqo5rqg5-7 {
        list-style-type: none;
      }
      ul.lst-kix_y28xcqo5rqg5-8 {
        list-style-type: none;
      }
      .lst-kix_dwt0m1b2bi36-5 > li:before {
        content: "\0025a0  ";
      }
      .lst-kix_dwt0m1b2bi36-6 > li:before {
        content: "\0025cf  ";
      }
      .lst-kix_dwt0m1b2bi36-8 > li:before {
        content: "\0025a0  ";
      }
      ol.lst-kix_3f81jyz4wf1-6 {
        list-style-type: none;
      }
      ol.lst-kix_3f81jyz4wf1-7 {
        list-style-type: none;
      }
      ol.lst-kix_3f81jyz4wf1-8 {
        list-style-type: none;
      }
      .lst-kix_dwt0m1b2bi36-7 > li:before {
        content: "\0025cb  ";
      }
      .lst-kix_3f81jyz4wf1-3 > li {
        counter-increment: lst-ctn-kix_3f81jyz4wf1-3;
      }
      .lst-kix_3f81jyz4wf1-6 > li {
        counter-increment: lst-ctn-kix_3f81jyz4wf1-6;
      }
      ol.lst-kix_3f81jyz4wf1-7.start {
        counter-reset: lst-ctn-kix_3f81jyz4wf1-7 0;
      }
      ol.lst-kix_3f81jyz4wf1-0.start {
        counter-reset: lst-ctn-kix_3f81jyz4wf1-0 0;
      }
      li.li-bullet-0:before {
        margin-left: -18pt;
        white-space: nowrap;
        display: inline-block;
        min-width: 18pt;
      }
      ul.lst-kix_bkzflgrrbamu-3 {
        list-style-type: none;
      }
      ul.lst-kix_bkzflgrrbamu-2 {
        list-style-type: none;
      }
      ul.lst-kix_bkzflgrrbamu-5 {
        list-style-type: none;
      }
      .lst-kix_dwt0m1b2bi36-2 > li:before {
        content: "\0025a0  ";
      }
      ul.lst-kix_bkzflgrrbamu-4 {
        list-style-type: none;
      }
      ul.lst-kix_bkzflgrrbamu-7 {
        list-style-type: none;
      }
      ul.lst-kix_bkzflgrrbamu-6 {
        list-style-type: none;
      }
      .lst-kix_dwt0m1b2bi36-1 > li:before {
        content: "\0025cb  ";
      }
      ul.lst-kix_bkzflgrrbamu-8 {
        list-style-type: none;
      }
      .lst-kix_dwt0m1b2bi36-0 > li:before {
        content: "\0025cf  ";
      }
      ul.lst-kix_bkzflgrrbamu-1 {
        list-style-type: none;
      }
      ul.lst-kix_bkzflgrrbamu-0 {
        list-style-type: none;
      }
      ol {
        margin: 0;
        padding: 0;
      }
      table td,
      table th {
        padding: 0;
      }
      .c5 {
        color: #000000;
        font-weight: 400;
        text-decoration: none;
        vertical-align: baseline;
        font-size: 11pt;
        font-family: "Arial";
        font-style: italic;
      }
      .c3 {
        padding-top: 0pt;
        padding-bottom: 0pt;
        line-height: 1.15;
        orphans: 2;
        widows: 2;
        text-align: left;
        height: 11pt;
      }
      .c21 {
        color: #000000;
        font-weight: 400;
        text-decoration: none;
        vertical-align: baseline;
        font-size: 12pt;
        font-family: "Arial";
        font-style: normal;
      }
      .c16 {
        color: #000000;
        font-weight: 400;
        text-decoration: none;
        vertical-align: baseline;
        font-size: 16pt;
        font-family: "Arial";
        font-style: normal;
      }
      .c23 {
        color: #000000;
        font-weight: 400;
        text-decoration: none;
        vertical-align: baseline;
        font-size: 21pt;
        font-family: "Arial";
        font-style: normal;
      }
      .c13 {
        padding-top: 0pt;
        padding-bottom: 3pt;
        line-height: 1.15;
        page-break-after: avoid;
        orphans: 2;
        widows: 2;
        text-align: left;
      }
      .c7 {
        color: #000000;
        font-weight: 400;
        text-decoration: none;
        vertical-align: baseline;
        font-size: 17pt;
        font-family: "Arial";
        font-style: normal;
      }
      .c15 {
        padding-top: 0pt;
        padding-bottom: 0pt;
        line-height: 1.15;
        orphans: 2;
        widows: 2;
        text-align: right;
        height: 11pt;
      }
      .c18 {
        color: #000000;
        font-weight: 400;
        text-decoration: none;
        vertical-align: baseline;
        font-size: 9pt;
        font-family: "Arial";
        font-style: normal;
      }
      .c0 {
        color: #000000;
        font-weight: 400;
        text-decoration: none;
        vertical-align: baseline;
        font-size: 11pt;
        font-family: "Arial";
        font-style: normal;
      }
      .c1 {
        padding-top: 0pt;
        padding-bottom: 12pt;
        line-height: 1.15;
        orphans: 2;
        widows: 2;
        text-align: left;
      }
      .c6 {
        padding-top: 0pt;
        padding-bottom: 10pt;
        line-height: 1.15;
        orphans: 2;
        widows: 2;
        text-align: left;
      }
      .c4 {
        padding-top: 0pt;
        padding-bottom: 4pt;
        line-height: 1.2;
        orphans: 2;
        widows: 2;
        text-align: left;
      }
      .c11 {
        padding-top: 0pt;
        padding-bottom: 12pt;
        line-height: 1.15;
        orphans: 2;
        widows: 2;
        text-align: justify;
      }
      .c14 {
        color: #000000;
        font-weight: 700;
        text-decoration: none;
        vertical-align: baseline;
        font-family: "Arial";
        font-style: normal;
      }
      .c19 {
        padding-top: 0pt;
        padding-bottom: 0pt;
        line-height: 1.15;
        orphans: 2;
        widows: 2;
        text-align: left;
      }
      .c24 {
        color: inherit;
        text-decoration: inherit;
      }
      .c10 {
        padding: 0;
        margin: 0;
      }
      .c20 {
        max-width: 468pt;
        padding: 72pt 72pt 72pt 72pt;
      }
      .c2 {
        margin-left: 36pt;
        padding-left: 0pt;
      }
      .c22 {
        font-weight: 700;
      }
      .c9 {
      }
      .c8 {
        font-size: 17pt;
      }
      .c17 {
        color: #1155cc;
      }
      .c12 {
        background-color: #ffffff;
      }
      .title {
        padding-top: 0pt;
        color: #000000;
        font-size: 26pt;
        padding-bottom: 3pt;
        font-family: "Arial";
        line-height: 1.15;
        page-break-after: avoid;
        orphans: 2;
        widows: 2;
        text-align: left;
      }
      .subtitle {
        padding-top: 0pt;
        color: #666666;
        font-size: 15pt;
        padding-bottom: 16pt;
        font-family: "Arial";
        line-height: 1.15;
        page-break-after: avoid;
        orphans: 2;
        widows: 2;
        text-align: left;
      }
      li {
        color: #000000;
        font-size: 11pt;
        font-family: "Arial";
      }
      p {
        margin: 0;
        color: #000000;
        font-size: 11pt;
        font-family: "Arial";
      }
      h1 {
        padding-top: 20pt;
        color: #000000;
        font-size: 20pt;
        padding-bottom: 6pt;
        font-family: "Arial";
        line-height: 1.15;
        page-break-after: avoid;
        orphans: 2;
        widows: 2;
        text-align: left;
      }
      h2 {
        padding-top: 18pt;
        color: #000000;
        font-size: 16pt;
        padding-bottom: 6pt;
        font-family: "Arial";
        line-height: 1.15;
        page-break-after: avoid;
        orphans: 2;
        widows: 2;
        text-align: left;
      }
      h3 {
        padding-top: 16pt;
        color: #434343;
        font-size: 14pt;
        padding-bottom: 4pt;
        font-family: "Arial";
        line-height: 1.15;
        page-break-after: avoid;
        orphans: 2;
        widows: 2;
        text-align: left;
      }
      h4 {
        padding-top: 14pt;
        color: #666666;
        font-size: 12pt;
        padding-bottom: 4pt;
        font-family: "Arial";
        line-height: 1.15;
        page-break-after: avoid;
        orphans: 2;
        widows: 2;
        text-align: left;
      }
      h5 {
        padding-top: 12pt;
        color: #666666;
        font-size: 11pt;
        padding-bottom: 4pt;
        font-family: "Arial";
        line-height: 1.15;
        page-break-after: avoid;
        orphans: 2;
        widows: 2;
        text-align: left;
      }
      h6 {
        padding-top: 12pt;
        color: #666666;
        font-size: 11pt;
        padding-bottom: 4pt;
        font-family: "Arial";
        line-height: 1.15;
        page-break-after: avoid;
        font-style: italic;
        orphans: 2;
        widows: 2;
        text-align: left;
      }
`;
