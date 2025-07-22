import 'package:flutter/material.dart';
class Header extends  StatelessWidget{
  const Header({super.key});

  @override
  Widget build(BuildContext context){
    return Container(
      padding: const EdgeInsets.all(40),
      alignment: Alignment.center,
      child: Column(
        children: const [
      Text(
        'Linsa Vinod',
        style: TextStyle(
          fontSize: 40,
           fontWeight: FontWeight.bold
        ),
      ),
        SizedBox(height: 10),
        Text(
          'Flutter Developer | Web Developer ',
        style: TextStyle(fontSize: 20),

        )
    ],
    ),
  );
}
}