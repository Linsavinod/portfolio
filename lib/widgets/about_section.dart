import 'package:flutter/material.dart';

class AboutSection extends StatelessWidget{
  const AboutSection({super.key});

@override
 Widget build(BuildContext context){
  return Container(
    padding:const EdgeInsets.all(32),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: const[
        Text(
          'About Me',
          style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold),
        ),
        SizedBox(height: 12),
        Text(
           "I'm Linsa Vinod, a passionate Flutter developer with experience building beautiful and functional apps using Flutter, Firebase, and modern tools. I love turning ideas into real products and continuously learning new tech.",
           style: TextStyle(fontSize: 18,height: 1.5),
        ),
      ],
        ),
  );
  }
 }