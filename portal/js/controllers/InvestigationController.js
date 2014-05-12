var CHART_DATA = [
  {  "name":"A", "value":0.01492 },
  {  "name":"B", "value":0.08167 },
  {  "name":"C", "value":0.02780 },
  {  "name":"D", "value":0.04253 },
  {  "name":"E", "value":0.12702 },
  {  "name":"F", "value":0.02288 },
  {  "name":"G", "value":0.02022 },
  {  "name":"H", "value":0.06094 },
  {  "name":"I", "value":0.06973 },
  {  "name":"J", "value":0.00153 },
  {  "name":"K", "value":0.00747 }
];

App.InvestigationController = Ember.ObjectController.extend({
  chartData: CHART_DATA
});